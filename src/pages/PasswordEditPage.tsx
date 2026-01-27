import Divider from "../components/Divider";
import EditLabel from "../components/EditLabel";
import LoginButton from "../components/LoginButton";
import MyPageTopBar from "../components/MyPageTopBar";
import PassWordForm from "../components/PassWordForm";
import checkIcon from "../assets/icons/check.svg";
import { useState } from "react";

const PasswordEditPage = () => {
    const [passwordError, setPasswordError] = useState(false);

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <MyPageTopBar />
            <EditLabel mainLabel="프로필 수정" subLabel="비밀번호 수정" />

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <PassWordForm label="비밀번호 수정" placeholder="이전 비밀번호" />
                {passwordError && (
                    <p className="text-[#D75D59] flex flex-row items-center justify-start gap-[4px]">
                        <img src={checkIcon} alt="" />
                        {passwordError}
                    </p>
                )}
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[20px] pt-[30px] font-[14px] text-[#BDB7B2]">
                <div className="w-full flex flex-row items-center justify-start gap-[10px]">
                    <span className="flex items-center gap-[4px]">
                        <img src={checkIcon} alt="" />
                        영문 포함
                    </span>
                    <span className="flex items-center gap-[4px]">
                        <img src={checkIcon} alt="" />
                        숫자 포함
                    </span>
                    <span className="flex items-center gap-[4px]">
                        <img src={checkIcon} alt="" />
                        8-12자 이내
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <PassWordForm label="" placeholder="새 비밀번호 입력" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[20px] pt-[10px] font-[14px] text-[#BDB7B2]">
                <div className="w-full flex flex-row items-center justify-start gap-[10px]">
                    <span className="flex items-center gap-[4px]">
                        <img src={checkIcon} alt="" />
                        비밀번호 일치
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] pt-[6px] pb-[4px] gap-[10px]">
                <PassWordForm label="" placeholder="새 비밀번호 확인" />
                <div className="w-full flex flex-row items-center justify-center py-[10px]">
                    <Divider />
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] pt-[20px] pb-[20px] gap-[10px]">
                <LoginButton label="비밀번호 수정하기" />
            </div>
        </div>
    );
};

export default PasswordEditPage;
