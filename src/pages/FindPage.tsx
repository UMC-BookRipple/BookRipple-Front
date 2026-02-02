import EmailInput from "../components/EmailInput"
import FormLabel from "../components/FormLabel"
import LoginButton from "../components/LoginButton"
import MyPageLabel from "../components/MyPageLabel"
import Header from "../components/Header"
import { useState } from "react"

const MyPageFindPage = () => {

    const [localValue, setLocalValue] = useState("");
    const [domainValue, setDomainValue] = useState("");

    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <Header />
            <MyPageLabel label="아이디/비밀번호 찾기" />
            <div className="w-full flex flex-col justify-center whitespace-nowrap px-[20px] pt-[20px] pb-[10px] gap-[10px]">
                <p className="text-[16px] text-[#58534E]">메일로 비밀번호를 보내드릴게요</p>
            </div>

            {/* 버튼 구현 */}
            <div className="w-full flex flex-row items-center justify-center whitespace-nowrap px-[16px] pt-[10px] pb-[4px] gap-[10px]">
                <button className="w-full h-[43px] rounded-[10px] bg-[#FFFFFF] flex items-center justify-center px-[20px] py-[12px] gap-[10px]">
                    아이디 찾기
                </button>
                <button className="w-full h-[43px] rounded-[10px] bg-[#FFFFFF] flex items-center justify-center px-[20px] py-[12px] gap-[10px]">
                    비밀번호 찾기
                </button>
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[20px]">
                <FormLabel label="비밀번호" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <EmailInput
                    localValue={localValue}
                    domainValue={domainValue}
                    onLocalChange={setLocalValue}
                    onDomainChange={setDomainValue}
                />

            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[10px]">
                <LoginButton label="비밀번호 보내기" onClick={() => { }} variant="lightBrown" />
            </div>

        </div>
    )
}

export default MyPageFindPage