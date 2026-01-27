import BigLogo from "../components/BigLogo";

const SignupCompletePage = () => {
    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1]">
            <div className="flex items-center justify-center">
                <BigLogo />
            </div>
            <div
                className="w-full pt-[20px] px-[20px] gap-[10px]">
                <div
                    className="h-[42px] flex flex-col text-center text-[18px] font-medium font-[Freesentation] text-[#58534E]">
                    <span>북 리플 회원 가입이 완료되었어요</span>
                    <span>한 권의 깊은 울림을 경험하러 가보실까요?</span>
                </div>
            </div>
            <div className="pb-[30px]" />
        </div>
    )
}

export default SignupCompletePage;