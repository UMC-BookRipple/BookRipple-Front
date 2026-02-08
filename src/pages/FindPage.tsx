import MyPageLabel from "../components/MyPageLabel";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const FindPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <Header />
            <MyPageLabel label="아이디/비밀번호 찾기" />

            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <p className="text-[16px] text-[#58534E]">
                    메일로 인증번호를 보내드릴게요
                </p>
            </div>

            {/* 메뉴 버튼 */}
            <div className="w-full flex gap-[10px] px-[16px] pt-[10px] pb-[4px]">
                <button
                    className="w-full h-[43px] rounded-[10px] bg-white"
                    onClick={() => navigate("/find-id/email/send")}
                >
                    아이디 찾기
                </button>
                <button
                    className="w-full h-[43px] rounded-[10px] bg-white"
                    onClick={() => navigate("/find-password/email/send")}
                >
                    비밀번호 찾기
                </button>
            </div>
        </div>
    );
};

export default FindPage;
