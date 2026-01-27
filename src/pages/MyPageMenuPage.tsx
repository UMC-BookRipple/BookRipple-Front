import Divider from "../components/Divider";
import MenuBarItems from "../components/MenuBarItems";
import MyPageTopBar from "../components/MyPageTopBar";

const MyPageMenuPage = () => {
    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] font-weight-[500] text-[#58534E]">
            <MyPageTopBar />

            {/* MyPageLabel */}
            <div
                className="w-full flex items-center px-[14px] pt-[30px]">
                <span
                    className="h-[50px] py-[12px] px-[5px] gap-[10px] flex items-center whitespace-nowrap font-[GmarketSansBold] text-[20px] text-[#58534E]">
                    <img src={arrowIcon} alt="" />MY PAGE</span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">

                <Divider />
                <div className="w-full">
                    <MenuBarItems mainLabel="프로필" MenuBarLabel="" plusMenuLabel="수정" />
                </div>
                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[14px] py-[10px] gap-[6px]">
                <div className="px-[4px]">
                    <span className="px-[8px] py-[4px] bg-[#E6E6E6] rounded-[20px]">UserName</span>
                </div>
                <span className="px-[10px]">카카오로 로그인</span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems mainLabel="내 도서 기록" MenuBarLabel="" />
                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[24px] py-[10px] text-[16px] font-weight-[500] text-[#58534E] gap-[6px]">
                <span>내 도서 기록 확인하기</span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems mainLabel="내 기록 확인" MenuBarLabel="" />
                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[24px] py-[10px] text-[16px] font-weight-[500] text-[#58534E] gap-[16px]">
                <span>작성한 감상평 확인</span>
                <span>메모 전체 기록 관리</span>
                <span>질문 답변 전체 기록 관리</span>
            </div>

            <div className="w-full flex flex-col items-center justify-center py-[4px] px-[10px] gap-[8px]">
                <Divider />
                <span>
                    약관 및 정보
                </span>
                <span>
                    회원 탈퇴
                </span>
            </div>

        </div>
    )
}

export default MyPageMenuPage;
