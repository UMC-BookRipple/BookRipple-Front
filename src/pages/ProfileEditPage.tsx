import { useState } from "react";
import Divider from "../components/Divider";
import FormLabel from "../components/FormLabel";
import LoginButton from "../components/LoginButton";
import MyPageLabel from "../components/MyPageLabel";
import Header from "../components/Header";
import PassWordForm from "../components/PassWordForm";
import CheckIcon from "../assets/icons/checkIcon.svg"; // 있으면 사용

const ProfileEditPage = () => {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleVerify = async () => {
        if (!password.trim()) {
            setPasswordError(true);
            return;
        }

        // ✅ TODO: 여기서 서버로 "비밀번호 재확인" 요청
        // 예:
        // const ok = await verifyPassword(password);
        // if (!ok) setPasswordError(true); else setPasswordError(false);

        // 지금은 예시로 "틀림" 처리
        setPasswordError(true);
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <Header />
            <MyPageLabel label="프로필 수정" />

            <div className="w-full flex flex-col items-start justify-center whitespace-nowrap px-[20px] pt-[20px] pb-[10px] gap-[10px]">
                <p className="text-[16px] text-[#58534E]">
                    정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 입력해 주세요
                </p>
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[20px]">
                <FormLabel label="비밀번호" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] pt-[4px] pb-[6px]">
                <PassWordForm
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(v: string) => {
                        setPassword(v);
                        if (passwordError) setPasswordError(false); // 다시 입력하면 에러 숨김
                    }}
                    type="password"
                    label=""
                />

                {/* ✅ 비밀번호 틀림/미입력 메시지 */}
                {passwordError && (
                    <div className="w-full flex items-center gap-[6px] text-[14px] text-[#D75D59] mt-[6px] px-[6px]">
                        {/* 아이콘 없어도 되면 지워도 됨 */}
                        <img src={CheckIcon} alt="" />
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[30px] px-[16px] pb-[20px]">
                <Divider />
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[45px] px-[16px] pb-[10px]">
                <LoginButton label="로그인하기" onClick={handleVerify} />
            </div>

            <div className="w-full flex flex-col items-center justify-center py-[12px] px-[10px]">
                <span className="text-[16px] text-[#58534E] underline" onClick={() => { }}>
                    비밀번호 찾기
                </span>
            </div>
        </div>
    );
};

export default ProfileEditPage;
