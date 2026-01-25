import LoginButton from "../components/LoginButton";
import LoginFormBody from "../components/LoginForm";
import { useState } from "react";
import TopLogo from "../components/TopLogo";

const LoginPage = () => {

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");



    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <TopLogo />
            <LoginFormBody userId={loginId} password={password} onChangeUserId={setLoginId} onChangePassword={setPassword} />

            <div
                className="w-full h-[104px] pt-[45px] pb-[10px] px-[16px] flex items-center justify-center">
                <LoginButton label="로그인하기" onClick={() => { }} />
            </div>

            <div
                className="h-[43px] gap-[10px] underline flex items-center justify-center">
                <p
                    className="text-[#58534E] font-[Freesentation] font-regular text-[16px]">비밀번호 찾기</p>
            </div>
        </div>
    )
}

export default LoginPage;