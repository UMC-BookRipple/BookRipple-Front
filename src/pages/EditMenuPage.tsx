import MyPageLabel from "../components/MyPageLabel"
import MyPageTopBar from "../components/MyPageTopBar"

const MyPageEditMenuPage = () => {

    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1]">
            <MyPageTopBar />
            <MyPageLabel label="프로필 수정" />

            <div className="w-full flex flex-col justify-center items-start px-[14px] py-[2px] text-[16px] font-weight-[500] self-start text-[#58534E] font-[Freesentation]">
                <span className="flex px-[10px] py-[6px] gap-[10px]">아이디 수정</span>
                <span className="flex px-[10px] py-[6px] gap-[10px]">비밀번호 수정</span>
            </div>

        </div>
    )
}

export default MyPageEditMenuPage