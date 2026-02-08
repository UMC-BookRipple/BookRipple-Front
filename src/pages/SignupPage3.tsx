import TopLogo from "../components/TopLogo";
import SignupLabel from "../components/SignupLabel";
import FormLabel from "../components/FormLabel";
import LoginTextInput from "../components/LoginTextInput";
import { useMemo, useRef, useState } from "react";
import Divider from "../components/Divider";
import LoginButton from "../components/LoginButton";
import calendarIcon from "../assets/icons/calendarIcon.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useSignupStore } from "../stores/signupStore";
import EmailInput from "../components/EmailInput";
import CheckIconGreen from "../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../assets/icons/checkIconRed.svg";
import axios from "axios";
import CheckIcon from "../assets/icons/checkIcon.svg";
import { useEmailVerification } from "../hooks/useEmailVerification";
import Toast from "../components/Toast";
import { useLocation } from "react-router-dom";

const SignupPage3 = () => {
    const location = useLocation();

    const from = location.state && (location.state as any).from;

    if (from !== "SignupPage2") {
        return <Navigate to="/signup/step2" replace />;
    }

    const navigate = useNavigate();
    const { signupData, resetSignupData } = useSignupStore();

    const [birthDisplay, setBirthDisplay] = useState<string>("");
    const dateRef = useRef<HTMLInputElement | null>(null);

    const {
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
    } = useEmailVerification({
        sendUrl: `${import.meta.env.VITE_API_BASE_URL}/auth/email/send`,
        verifyUrl: `${import.meta.env.VITE_API_BASE_URL}/auth/email/verify`,
    });


    const isBirthValid = Boolean(birthDisplay);
    const isEmailVerified = emailVerifyStatus === "success";

    const canSignup = isBirthValid && isEmailVerified;

    // 오늘 날짜 (미래 선택 방지)
    const maxDate = useMemo<string>(() => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, []);

    // 숫자만 허용 + YYYY.MM.DD 포맷
    const formatDots = (value: string): string => {
        const digits = value.replace(/\D/g, "").slice(0, 8);
        const y = digits.slice(0, 4);
        const m = digits.slice(4, 6);
        const d = digits.slice(6, 8);

        if (digits.length <= 4) return y;
        if (digits.length <= 6) return `${y}.${m}`;
        return `${y}.${m}.${d}`;
    };

    // YYYY.MM.DD → YYYY-MM-DD
    const toISO = (value: string): string => {
        const digits = value.replace(/\D/g, "");
        if (digits.length !== 8) return "";

        return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
    };

    // YYYY-MM-DD → YYYY.MM.DD
    const fromISO = (iso: string): string => {
        if (!iso) return "";
        return formatDots(iso.replaceAll("-", ""));
    };

    // 달력 열기
    const openPicker = (): void => {
        const el = dateRef.current;
        if (!el) return;

        const anyEl = el as any;

        if (typeof anyEl.showPicker === "function") {
            anyEl.showPicker();
        } else {
            el.focus();
            el.click();
        }
    };

    if (location.state.from !== "SignupPage2") {
        navigate("/signup/step2");
    }

    const handleSignup = async () => {

        const birthDate = dateRef.current?.value || "";
        if (!birthDate) {
            alert("생년월일을 입력해주세요.");
            return;
        }

        // store에 최종 값 저장
        useSignupStore.getState().setSignupData({
            email: `${localValue}${domainValue}`,
            birthDate,
        });

        const finalData = {
            loginId: signupData.loginId,
            password: signupData.password,
            name: signupData.name,
            email: `${localValue}${domainValue}`,
            birthDate,
            isRequiredAgreed: signupData.isRequiredAgreed,
            isOptionalAgreed: signupData.isOptionalAgreed,
        };

        console.log("signupData", signupData);
        console.log("finalData", finalData);


        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
                finalData
            );

            if (!res.data.isSuccess) {
                console.log(res.data.message || "회원가입에 실패했습니다.");
                return;
            }

            resetSignupData();
            navigate("/signup/complete");
        } catch (e) {
            console.error(e);
            console.log("회원가입 중 오류가 발생했습니다.");
        }
    };



    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <TopLogo />
            <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-50">
                <Toast visible={toastVisible} message={toastMessage} />
            </div>
            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <SignupLabel />
            </div>

            <div className="w-full px-[16px] pt-[4px] pb-[6px]">
                <FormLabel label="생년월일 작성" />
            </div>

            {/* 생년월일 입력 + 달력 */}
            <div className="w-full flex flex-row gap-[6px] items-center justify-center px-[16px] pt-[6px] pb-[4px] relative">
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000.00.00"
                    value={birthDisplay}
                    onChange={(e) => setBirthDisplay(formatDots(e.target.value))}
                    className="w-full h-[45px] rounded-[100px] border border-black/25 bg-[#FFFFFF] px-[10px] py-[12px]"
                />

                {/* 실제 date picker */}
                <input
                    ref={dateRef}
                    type="date"
                    max={maxDate}
                    value={toISO(birthDisplay)}
                    onChange={(e) => setBirthDisplay(fromISO(e.target.value))}
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                    tabIndex={-1}
                />

                <button
                    type="button"
                    onClick={openPicker}
                    className="rounded-full border border-black/25 w-[45px] h-[45px] flex items-center justify-center bg-[#FFFFFF]"
                >
                    <img src={calendarIcon} alt="" className="p-[10px]" />
                </button>
            </div>

            <div className="w-full pt-[30px] px-[16px] pb-[10px]">
                <Divider />
            </div>

            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <FormLabel label="이메일 인증" />
            </div>

            <div className="w-full px-[16px] py-[4px] flex flex-col gap-[10px]">
                <EmailInput
                    localValue={localValue}
                    domainValue={domainValue}
                    onLocalChange={setLocalValue}
                    onDomainChange={setDomainValue}
                />
                <LoginButton
                    label="이메일 보내기"
                    onClick={sendEmail}
                    disabled={!localValue || !domainValue}
                    variant={localValue && domainValue ? "brown" : "lightBrown"}
                />
            </div>

            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <FormLabel label="인증번호 입력" />
            </div>

            <div className="w-full px-[16px] py-[4px] flex flex-col gap-[10px]">
                <LoginTextInput
                    placeholder="인증 코드 입력"
                    value={authCode}
                    onChange={setAuthCode}
                    type="text"
                    rightText={
                        timeLeft > 0
                            ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
                            : ""
                    }
                />

                <LoginButton
                    label="인증하기"
                    onClick={verifyEmailCode}
                    variant={emailSendStatus === "success" ? "brown" : "lightBrown"}
                />
                {authCode.length == 0 && emailVerifyStatus === 'idle' && (
                    <p className="text-[16px] text-[#BDB7B2] mt-[4px] px-[4px] flex flex-row items-center"><img src={CheckIcon} alt="" className="mb-[2px]" />인증이 완료되었습니다.</p>
                )}

                {emailVerifyStatus === 'success' && (
                    <p className="text-[16px] text-[#28A745] mt-[4px] px-[4px] flex flex-row items-center"><img src={CheckIconGreen} alt="" className="mb-[2px]" />인증이 완료되었습니다.</p>
                )}
                {emailVerifyStatus === 'error' && (
                    <p className="text-[16px] text-[#DC3545] mt-[4px] px-[4px] flex flex-row items-center"><img src={CheckIconRed} alt="" className="mb-[2px]" />인증에 실패했습니다.</p>
                )}
            </div>
            <div className="w-full px-[16px] py-[10px]">
                <Divider />
            </div>


            <div className="w-full pt-[45px] pb-[20px] px-[16px] flex items-center justify-center">
                <LoginButton
                    label="회원가입하기"
                    onClick={handleSignup}
                    disabled={!canSignup}
                    variant={canSignup ? "brown" : "lightBrown"}
                />
            </div>
        </div>
    );
};

export default SignupPage3;
