import LoginButton from "../components/LoginButton";
import LoginFormBody from "../components/LoginForm";
import { useState } from "react";
import TopLogo from "../components/TopLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // 에러 상태
    const [wrongId, setWrongId] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/login/local`,
                {
                    loginId: loginId,
                    password: password,
                }
            );

            const { isSuccess, code, message, result } = response.data;

            if (isSuccess) {
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("userName", result.userName);
                localStorage.setItem("memberId", result.memberId);

                console.log("로그인 성공", result);
                navigate("/profile/edit/menu");
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data) {
                    console.error("로그인 실패:", error.response.data);
                    alert("로그인에 실패했습니다.");
                } else {
                    console.error("서버 연결 실패", error.message);
                }
            } else {
                console.error("예상치 못한 오류:", error);
            }
        }
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <TopLogo />

            <LoginFormBody
                userId={loginId}
                password={password}
                onChangeUserId={(v) => {
                    setLoginId(v);
                    if (wrongId) setWrongId(false);
                }}
                onChangePassword={(v) => {
                    setPassword(v);
                    if (wrongPassword) setWrongPassword(false);
                }}
                wrongId={wrongId}
                wrongPassword={wrongPassword}
                showPassword={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
            />


            <div className="w-full h-[104px] pt-[45px] pb-[10px] px-[16px] flex items-center justify-center">
                <LoginButton label="로그인하기" onClick={handleLogin} />
            </div>

            <div className="h-[43px] gap-[10px] underline flex items-center justify-center">
                <p className="text-[#58534E] font-[Freesentation] font-regular text-[16px]"
                    onClick={() => navigate('/find/menu')}>
                    아이디/비밀번호 찾기
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
