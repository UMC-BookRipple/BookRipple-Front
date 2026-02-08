import Divider from "../components/Divider";
import EditLabel from "../components/EditLabel";
import LoginButton from "../components/LoginButton";
import Header from "../components/Header";
import PassWordForm from "../components/PassWordForm";
import CheckIcon from "../assets/icons/checkIcon.svg";
import { useState } from "react";
import CheckIconGreen from "../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../assets/icons/checkIconRed.svg";
import InputWithButton from "../components/InputWithButton";
import axios from "axios";
import FormLabel from "../components/FormLabel";
import EmailInput from "../components/EmailInput";
import LoginTextInput from "../components/LoginTextInput";
import { useEmailVerification } from "../hooks/useEmailVerification";
import Toast from "../components/Toast";
import { Navigate, useLocation } from "react-router-dom";

const PasswordEditPage = () => {
    const location = useLocation();

    const from = location.state && (location.state as any).from;

    if (from !== "ProfileEditPwPage") {
        return <Navigate to="/profile/edit/pw" replace />;
    }
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const ruleIcon = (ok: boolean) => {
        if (!isPasswordStarted) return CheckIcon;
        return ok ? CheckIconGreen : CheckIconRed;
    }

    const ruleIcon2 = (ok: boolean) => {
        if (!isConfirmStarted) return CheckIcon;
        return ok ? CheckIconGreen : CheckIconRed;
    }

    // ✅ 이전 비밀번호 에러(틀렸을 때 표시용)
    const [oldPasswordStatus, setOldPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // ✅ 새 비밀번호 규칙
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasLength = newPassword.length >= 8 && newPassword.length <= 12;

    const isPasswordStarted = newPassword.length > 0;
    const isConfirmStarted = newPasswordConfirm.length > 0;
    const passwordsMatch = newPassword === newPasswordConfirm && newPassword.length > 0;

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


    const verifyPassword = async () => {
        if (oldPassword.trim() === "") {
            console.log("이전 비밀번호를 입력해주세요.");
            return;
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/members/me/password/check`,
                {
                    content: oldPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            const { isSuccess, code, message } = response.data;

            if (isSuccess) {
                setOldPasswordStatus('success');
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
                setOldPasswordStatus('error');
            }
        } catch (error) {
            console.error('비밀번호 확인 실패:', error);
            setOldPasswordStatus('error');
        }
    };

    const changePassword = async () => {
        if (oldPasswordStatus !== 'success') {
            console.log("이전 비밀번호를 확인해주세요.");
            return;
        }
        if (newPassword.trim() === "") {
            console.log("새 비밀번호를 입력해주세요.");
            return;
        }
        if (newPasswordConfirm.trim() === "") {
            console.log("새 비밀번호 확인을 입력해주세요.");
            return;
        }
        if (newPassword !== newPasswordConfirm) {
            console.log("새 비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/members/me/password`,
                {
                    currentPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirm: newPasswordConfirm,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            const { isSuccess, code, message } = response.data;

            if (isSuccess) {
                console.log("비밀번호가 성공적으로 변경되었습니다.");
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
            }
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
        }
    }

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-50">
                <Toast visible={toastVisible} message={toastMessage} />
            </div>

            <Header />
            <EditLabel mainLabel="프로필 수정" subLabel="비밀번호 수정" />

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

            {/* 이전 비밀번호 */}
            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <InputWithButton value={oldPassword} onChange={setOldPassword} buttonLabel="확인" onButtonClick={verifyPassword} placeholder="이전 비밀번호" />
                <div className="w-full flex flex-col items-start">
                    {oldPasswordStatus == 'error' && (
                        <p className="text-[14px] text-[#DC3545] flex flex-row items-start mt-[4px] px-[4px]">
                            <img src={CheckIconRed} alt="" className="mb-[2px]" />
                            비밀번호가 일치하지 않습니다!
                        </p>
                    )}
                    {oldPasswordStatus == 'success' && (
                        <p className="text-[14px] text-[#28A745] flex flex-row items-start mt-[4px] px-[4px]">
                            <img src={CheckIconGreen} alt="" className="mb-[2px]" />
                            비밀번호가 일치합니다
                        </p>
                    )}
                </div>
            </div>

            <div className="h-[20px]" />

            {/* 새 비밀번호 */}
            <div className="w-full flex flex-col items-center px-[16px] py-[4px]">
                <PassWordForm
                    label=""
                    type="password"
                    placeholder="비밀번호 입력"
                    value={newPassword}
                    onChange={setNewPassword}
                />
            </div>

            {/* 규칙 */}
            <div className="w-full flex flex-col items-center justify-center px-[20px] pb-[10px] text-[14px]">
                <div className="w-full flex items-center gap-[10px]">
                    <span
                        className={`flex items-center gap-[4px] ${!isPasswordStarted
                            ? "text-[#BDB7B2]"
                            : hasLetter
                                ? "text-[#7FB77E]"
                                : "text-[#D75D59]"
                            }`}
                    >
                        <img src={ruleIcon(hasLetter)} alt="" />
                        영문 포함
                    </span>

                    <span
                        className={`flex items-center gap-[4px] ${!isPasswordStarted
                            ? "text-[#BDB7B2]"
                            : hasNumber
                                ? "text-[#7FB77E]"
                                : "text-[#D75D59]"
                            }`}
                    >
                        <img src={ruleIcon(hasNumber)} alt="" />
                        숫자 포함
                    </span>

                    <span
                        className={`flex items-center gap-[4px] ${!isPasswordStarted
                            ? "text-[#BDB7B2]"
                            : hasLength
                                ? "text-[#7FB77E]"
                                : "text-[#D75D59]"
                            }`}
                    >
                        <img src={ruleIcon(hasLength)} alt="" />
                        8-12자 이내
                    </span>
                </div>
            </div>

            {/* 비밀번호 확인 */}
            <div className="w-full flex flex-col items-center px-[16px] pt-[6px] pb-[4px]">
                <PassWordForm
                    label=""
                    type="password"
                    placeholder="비밀번호 확인"
                    value={newPasswordConfirm}
                    onChange={setNewPasswordConfirm}
                    showPassword={showPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                />
            </div>

            <div className={`w-full flex felx-row items-center justify-start gap-[6px] text-[14px] px-[20px] pb-[10px] text-[14px] ${!isConfirmStarted
                ? "text-[#BDB7B2]"
                : passwordsMatch
                    ? "text-[#7FB77E]"
                    : "text-[#D75D59]"
                }`}>
                <img src={ruleIcon2(passwordsMatch)} alt="" />
                비밀번호 일치
            </div>

            <div className="w-full flex justify-center py-[10px] px-[16px]">
                <Divider />
            </div>

            {/* 버튼 */}
            <div className="w-full flex flex-col items-center justify-center px-[16px] pt-[20px] pb-[20px]">
                <LoginButton
                    label="완료"
                    onClick={changePassword}
                    disabled={!oldPassword || !hasLetter || !hasNumber || !hasLength || !passwordsMatch}
                    variant={oldPassword && hasLetter && hasNumber && hasLength && passwordsMatch ? "brown" : "lightBrown"}
                />
            </div>
        </div>
    );
};

export default PasswordEditPage;
