import { useState, useEffect, useCallback, useRef } from "react";
import { http } from "../types/http";

type Status = "idle" | "success" | "error";

type EmailVerificationEndpoints = {
    sendUrl: string;
    verifyUrl: string;
};

export const useEmailVerification = ({
    sendUrl,
    verifyUrl,
}: EmailVerificationEndpoints) => {
    const [resultValue, setResultValue] = useState<string>("");

    const [localValue, setLocalValue] = useState("");
    const [domainValue, setDomainValue] = useState("");
    const [authCode, setAuthCode] = useState("");

    const [emailSendStatus, setEmailSendStatus] = useState<Status>("idle");
    const [emailVerifyStatus, setEmailVerifyStatus] = useState<Status>("idle");

    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    const toastTimerRef = useRef<number | null>(null);

    const showToast = useCallback((msg: string) => {
        const trimmed = msg?.trim();
        if (!trimmed) return;

        setToastMessage(trimmed);
        setToastVisible(true);

        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }

        toastTimerRef.current = window.setTimeout(() => {
            setToastVisible(false);
            setToastMessage(""); // <- 중요: 다음 페이지에서 공백 렌더 방지
        }, 2000);
    }, []);

    useEffect(() => {
        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
                toastTimerRef.current = null;
            }
        };
    }, []);



    const sendEmail = async () => {
        try {
            const res = await http.post(
                `${sendUrl}`,
                {
                    content: `${localValue}${domainValue}`
                }
            );

            const { isSuccess, code, message, result } = res.data;

            if (isSuccess) {
                setEmailSendStatus("success");
                setEmailVerifyStatus("idle");
                setTimeLeft(120); // ⏱ 2분 시작
                showToast("이메일을 전송하였습니다.");
                console.log(message);
            } else {
                setEmailSendStatus("error");
            }
        } catch {
            setEmailSendStatus("error");
        }
    };

    const verifyEmailCode = async () => {
        if (timeLeft <= 0) {
            setEmailVerifyStatus("error");
            return;
        }

        try {
            const res = await http.post(
                `${verifyUrl}`,
                {
                    email: `${localValue}${domainValue}`,
                    code: authCode,
                }
            );

            const { isSuccess, code, message, result } = res.data;

            if (isSuccess) {
                setEmailVerifyStatus("success");
                setTimeLeft(0);
                setResultValue(result ?? "");
                console.log(message);
            } else {
                setEmailVerifyStatus("error");
            }
        } catch {
            setEmailVerifyStatus("error");
        }
    };

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return {
        localValue,
        domainValue,
        authCode,
        emailSendStatus,
        emailVerifyStatus,
        timeLeft,
        setLocalValue,
        setDomainValue,
        setAuthCode,
        sendEmail,
        verifyEmailCode,
        toastVisible,
        toastMessage,
        showToast,
        resultValue,
        getFullEmail: () => `${localValue}${domainValue}`,
    };
};
