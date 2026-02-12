import Divider from "../../components/Divider";
import FormLabel from "../../components/FormLabel";
import Header from "../../components/Header";
import LoginButton from "../../components/LoginButton";
import LoginTextInput from "../../components/LoginTextInput";
import { useState } from "react";
import CheckIconGreen from "../../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../../assets/icons/checkIconRed.svg";
import CheckIcon from "../../assets/icons/checkIcon.svg";
import arrowIcon from "../../assets/icons/arrowIcon.svg";
import PassWordForm from "../../components/PassWordForm";
import { useChangeStore } from "../../stores/changeStore";
import { useNavigate, useLocation } from "react-router-dom";
import Toast from "../../components/Toast";
import { http } from "../../types/http";

const ResetPasswordPage = () => {
    const { changeData } = useChangeStore();
    const location = useLocation();
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    /** 👁 비밀번호 보기 토글 */
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    /** ===== 명세서 기준 비밀번호 조건 ===== */
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const hasLength = password.length >= 8;

    const typeCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
    const hasTwoTypes = typeCount >= 2;

    const isPasswordStarted = password.length > 0;

    const ruleColor = (ok: boolean) => {
        if (!isPasswordStarted) return "text-[#BDB7B2]";
        return ok ? "text-[#7FB77E]" : "text-[#D75D59]";
    };

    const ruleIcon = (ok: boolean) => {
        if (!isPasswordStarted) return CheckIcon;
        return ok ? CheckIconGreen : CheckIconRed;
    };

    const passwordsMatch =
        passwordConfirm.length > 0 && password === passwordConfirm;

    if (location.state?.from !== "FindPasswordPage") {
        navigate("/find-password");
    }

    const handleResetPassword = async () => {
        console.log(changeData);
        try {
            const response = await http.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/find-pw/password/reset`,
                {
                    email: changeData.email,
                    newPassword: password,
                });
            const { isSuccess, message, code, result } = response.data;
            if (isSuccess) {
                setVisible(true);
                setMessage("변경이 완료되었습니다");
                setTimeout(() => {
                    navigate("/find/menu");
                }, 2000);
            } else {
                alert(message);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-50">
                {!!message.trim() && <Toast visible={visible} message={message} />}
            </div>

            <Header />
            <div
                className="w-full flex flex-row items-center px-[20px] pt-[20px] gap-[10px]">
                <img src={arrowIcon} className="mb-[3px]"
                    onClick={() => navigate(-1)} />
                <div
                    className="text-[18px] font-weight-[500] text-[#58534E] whitespace-nowrap"
                    onClick={() => navigate(-1)}>비밀번호 찾기</div>
            </div>
            <div className="w-full px-[16px] py-[10px] flex items-center justify-center gap-[10px]">
                <Divider />
            </div>
            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <FormLabel label="비밀번호 재설정" />
            </div>

            <div className="w-full px-[16px] pt-[4px] pb-[6px]">
                <PassWordForm
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={setPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                />
            </div>

            <div className="w-full px-[20px] pb-[10px] flex items-center gap-[14px]">
                {/* 8자 이상 */}
                <span className={`flex items-center text-[14px] ${ruleColor(hasLength)}`}>
                    <div className="w-[16px] h-[16px] mb-[2px]">
                        <img src={ruleIcon(hasLength)} alt="" />
                    </div>
                    8자 이상
                </span>

                {/* 2종 이상 */}
                <span className={`flex items-center text-[14px] ${ruleColor(hasTwoTypes)}`}>
                    <div className="w-[16px] h-[16px] mb-[2px]">
                        <img src={ruleIcon(hasTwoTypes)} alt="" />
                    </div>
                    영문, 숫자, 특수문자 중 2종 사용
                </span>
            </div>

            <div className="w-full px-[16px] pt-[4px] pb-[6px]">
                <LoginTextInput
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="비밀번호 확인"
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    onToggle={() => setShowPasswordConfirm((prev) => !prev)}
                />

                {passwordConfirm.length == 0 && (
                    <div className="text-[14px] mt-[4px] px-[4px] text-[#BDB7B2] flex items-center">
                        <img src={CheckIcon} alt="" />
                        비밀번호 일치
                    </div>
                )}

                {!passwordsMatch && passwordConfirm.length > 0 && (
                    <div className="text-[14px] mt-[4px] px-[4px] text-[#DC3545] flex items-center">
                        <img src={CheckIconRed} alt="" />
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}

                {passwordsMatch && passwordConfirm.length > 0 && (
                    <div className="text-[14px] mt-[4px] px-[4px] text-[#7FB77E] flex items-center">
                        <img src={CheckIconGreen} alt="" />
                        비밀번호가 일치합니다.
                    </div>
                )}

                <div className="px-[16px] py-[10px]" />
                <Divider />
            </div>

            <div className="w-full px-[16px] pt-[45px] pb-[20px] flex flex-col gap-[10px]">
                <LoginButton
                    label="완료"
                    onClick={handleResetPassword}
                    variant={passwordsMatch && hasLength && hasTwoTypes ? "brown" : "lightBrown"}
                />
            </div>
        </div>
    );
};

export default ResetPasswordPage;