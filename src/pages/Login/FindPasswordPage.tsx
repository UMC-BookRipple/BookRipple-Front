import Divider from "../../components/Divider";
import EmailInput from "../../components/EmailInput";
import FormLabel from "../../components/FormLabel";
import Header from "../../components/Header";
import LoginButton from "../../components/LoginButton";
import LoginTextInput from "../../components/LoginTextInput";
import CheckIconGreen from "../../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../../assets/icons/checkIconRed.svg";
import CheckIcon from "../../assets/icons/checkIcon.svg";
import arrowIcon from "../../assets/icons/arrowIcon.svg";
import { useChangeStore } from "../../stores/changeStore";
import { useNavigate } from "react-router-dom";
import { useEmailVerification } from "../../hooks/useEmailVerification";
import Toast from "../../components/Toast";
import { useEffect } from "react";

const FindPasswordPage = () => {
    const { setChangeData } = useChangeStore();
    const navigate = useNavigate();

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
        getFullEmail,
        toastVisible,
        toastMessage,
    } = useEmailVerification({
        sendUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/find-pw/email/send`,
        verifyUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/find-pw/email/verify`,
    });

    useEffect(() => {
        if (emailVerifyStatus === "success") {
            setChangeData({
                email: `${localValue}${domainValue}`,
            });
        }
    }, [emailVerifyStatus, localValue, domainValue, setChangeData]);


    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            {toastVisible && toastMessage.trim() && (
                <Toast visible={toastVisible} message={toastMessage} />
            )}

            <Header />
            <div
                className="w-full flex flex-row items-center px-[20px] pt-[20px] gap-[10px]">
                <img src={arrowIcon} className="mb-[3px] cursor-pointer" onClick={() => navigate(-1)} />
                <div
                    className="text-[18px] font-weight-[500] text-[#58534E] whitespace-nowrap">비밀번호 찾기</div>
            </div>
            <div className="w-full px-[16px] py-[10px] flex items-center justify-center gap-[10px]">
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
                    variant={domainValue && localValue ? "brown" : "lightBrown"}
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

            <div className="w-full px-[16px] pt-[45px] pb-[20px] flex flex-col gap-[10px]">
                <LoginButton
                    label="비밀번호 변경하기"
                    onClick={() => navigate("/find-password/reset", {
                        state: {
                            from: "FindPasswordPage"
                        }
                    })}
                    variant={emailVerifyStatus === "success" ? "brown" : "lightBrown"}
                />
            </div>
        </div>
    );
};

export default FindPasswordPage;