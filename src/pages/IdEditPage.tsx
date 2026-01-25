import Divider from "../components/Divider"
import EmailInput from "../components/EmailInput"
import FormLabel from "../components/FormLabel"
import InputWithButton from "../components/InputWithButton"
import LoginButton from "../components/LoginButton"
import EditLabel from "../components/EditLabel"
import MyPageTopBar from "../components/MyPageTopBar"

const IdEditPage = () => {
    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <MyPageTopBar />
            <EditLabel mainLabel="프로필 수정" subLabel="아이디 수정" />

            <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[20px]">
                <FormLabel label="아이디 수정" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <InputWithButton value="" onChange={() => { }} buttonLabel="중복확인" onButtonClick={() => { }} />
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[20px]">
                <FormLabel label="이메일 인증" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <EmailInput localValue="" domainValue="" onLocalChange={() => { }} onDomainChange={() => { }} />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[10px] gap-[10px]">
                <LoginButton label="이메일 인증하기" onClick={() => { }} variant="lightBrown" />
                <div className="w-full flex flex-col items-center justify-center py-[10px]">
                    <Divider />
                </div>
            </div>

            <div
                className="w-full flex flex-col items-center justify-center px-[16px] pt-[45px] pb-[20px]">
                <LoginButton label="비밀번호 설정하기" onClick={() => { }} />
            </div>

        </div>
    )
}

export default IdEditPage