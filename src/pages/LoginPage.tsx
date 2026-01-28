import LoginButton from "../components/LoginButton";
import LoginFormBody from "../components/LoginForm";
import { useState } from "react";
import TopLogo from "../components/TopLogo";

const LoginPage = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    // 에러 상태
    const [wrongId, setWrongId] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleLogin = () => {
        // API 연결 시 수정할 부분입니다
        const correctId = "test";
        const correctPw = "1234";

        // 이전 에러 초기화(선택)
        setWrongId(false);
        setWrongPassword(false);

        // 검증
        if (loginId !== correctId) {
            setWrongId(true);
            return;
        }
        if (password !== correctPw) {
            setWrongPassword(true);
            return;
        }

        // 성공 처리
        // navigate(...) 등
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <TopLogo />

            <LoginFormBody
                userId={loginId}
                password={password}
                onChangeUserId={(v) => {
                    setLoginId(v);
                    if (wrongId) setWrongId(false); // 입력하면 에러 지우기(선택)
                }}
                onChangePassword={(v) => {
                    setPassword(v);
                    if (wrongPassword) setWrongPassword(false); // 입력하면 에러 지우기(선택)
                }}
                wrongId={wrongId}
                wrongPassword={wrongPassword}
            />

            <div className="w-full h-[104px] pt-[45px] pb-[10px] px-[16px] flex items-center justify-center">
                <LoginButton label="로그인하기" onClick={handleLogin} />
            </div>

            <div className="h-[43px] gap-[10px] underline flex items-center justify-center">
                <p className="text-[#58534E] font-[Freesentation] font-regular text-[16px]">
                    비밀번호 찾기
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
