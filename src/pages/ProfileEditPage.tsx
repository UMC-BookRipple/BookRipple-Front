import Divider from "../components/Divider";
import FormLabel from "../components/FormLabel";
import LoginButton from "../components/LoginButton";
import MyPageLabel from "../components/MyPageLabel";
import MyPageTopBar from "../components/MyPageTopBar";
import PassWordForm from "../components/PassWordForm";

const MyPageFrofileEditPage = () => {
    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <MyPageTopBar />
            <MyPageLabel label="프로필 수정" />
            <div className="w-full flex flex-col items-center justify-center whitespace-nowrap px-[20px] pt-[20px] pb-[10px] gap-[10px]">
                <p className="text-[16px] text-[#58534E]">정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 입력해 주세요</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[20px]">
                <FormLabel label="비밀번호" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] pt-[4px] pb-[6px]">
                <PassWordForm placeholder="비밀번호를 입력하세요" value="" onChange={() => { }} type="password" label="" />
            </div>
            <div
                className="w-full flex flex-col items-center justify-center pt-[30px] px-[16px] pb-[20px]">
                <Divider />
            </div>
            <div
                className="w-full flex flex-col items-center justify-center pt-[45px] px-[16px] pb-[10px]">
                <LoginButton label="로그인하기" onClick={() => { }} />
            </div>
            <div
                className="w-full flex flex-col items-center justify-center py-[12px] px-[10px]">
                <span className="text-[16px] text-[#58534E] underline" onClick={() => { }}>비밀번호 찾기</span>
            </div>
        </div>
    );
};

export default MyPageFrofileEditPage;