import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import MyPageLabel from "../components/MyPageLabel"

const EditMenuPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1]">
            <Header />
            <MyPageLabel label="프로필 수정" />

            <div className="w-full flex flex-col justify-center items-start px-[14px] py-[2px] text-[16px] font-weight-[500] self-start text-[#58534E] font-[Freesentation]">
                <span className="flex px-[10px] py-[6px] gap-[10px]"
                    onClick={() => navigate('/profile/edit/id')}>아이디 수정</span>
                <span className="flex px-[10px] py-[6px] gap-[10px]"
                    onClick={() => navigate('/profile/edit/pw')}>비밀번호 수정</span>
            </div>

        </div>
    )
}

export default EditMenuPage