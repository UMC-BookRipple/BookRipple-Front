import Divider from "../../components/Divider";
import MenuBarItems from "../../components/MenuBarItems";
import Header from "../../components/Header";
import { http } from "../../types/http";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/icons/arrowIcon.svg";
import { useModalStore } from "../../stores/ModalStore";
import Modal from "../../components/Modal";

const MyPageMenuPage = () => {

    const navigate = useNavigate();

    const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;
    const K_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI as string;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

    const handleKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const handleLogout = async () => {

        try {
            const response = await http.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`,
                { refreshToken: localStorage.getItem("refreshToken") },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            const { isSuccess, code, message, result } = response.data;

            if (isSuccess) {
                console.log("로그아웃 성공", result);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/auth/login/local");
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
            }
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    const { open: openModal } = useModalStore()

    const confirmAction = () => {
        console.log("confirmAction")
        openModal("회원 탈퇴를 진행하시겠습니까?", handleDelete)
    }

    const handleDelete = async () => {
        try {
            const response = await http.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                    },
                }
            );

            const { isSuccess, code, message, result } = response.data;

            if (isSuccess) {
                console.log("회원탈퇴 성공", result);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userName");
                localStorage.removeItem("memberId");
                navigate("/auth/login/local");
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
            }
        } catch (error) {
            console.error('회원탈퇴 실패:', error);
        }
    }
    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] font-weight-[500] text-[#58534E]">
            <Header />

            {/* MyPageLabel */}
            <div
                className="w-full flex flex-row items-center justify-between px-[14px] pt-[30px]">
                <span
                    className="h-[50px] py-[12px] px-[5px] gap-[10px] flex items-center whitespace-nowrap font-[GmarketSansBold] text-[20px] text-[#58534E]">
                    <img src={arrowIcon} alt="" />MY PAGE</span>
                <button
                    onClick={handleLogout}
                    className="h-[28px] w-[58px] text-[14px] text-[#FFFFFF] bg-[#827A74] px-[8px] py-[6px] rounded-[30px] gap-[10px] flex items-center justify-center"
                >
                    로그아웃
                </button>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">

                <Divider />
                <div className="w-full">
                    <MenuBarItems mainLabel="프로필" MenuBarLabel="" plusMenuLabel="수정" onClickPlus={() => navigate('/profile/edit/menu')} />
                </div>
                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[14px] py-[10px] gap-[6px]">
                <div className="px-[4px]">
                    <span className="px-[8px] py-[4px] bg-[#E6E6E6] rounded-[20px]">{localStorage.getItem("userName")}</span>
                </div>
                <span className="px-[10px]"
                    onClick={handleKakaoLogin}
                >카카오로 로그인</span>
            </div>
            <Modal label="진행하기" />
            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems mainLabel="내 도서 기록" MenuBarLabel="" />
                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[24px] py-[10px] text-[16px] font-weight-[500] text-[#58534E] gap-[6px]">
                <span
                    onClick={() => navigate("/members/me/records")}>내 도서 기록 확인하기</span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems mainLabel="내 기록 확인" MenuBarLabel="" />
                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[24px] py-[10px] text-[16px] font-weight-[500] text-[#58534E] gap-[16px]">
                <span onClick={() => navigate("/reviews/me")}>작성한 감상평 확인</span>

                {/* 메모 API 안 보임 감상평과 동일?? */}
                <span onClick={() => navigate("/memos/me")}>메모 전체 기록 관리</span>
                <span onClick={() => navigate("/questions/me")}>질문 답변 전체 기록 관리</span>
            </div>

            <div className="w-full flex flex-col items-center justify-center py-[4px] px-[10px] pb-[20px]">
                <Divider />
                <div className="h-[189px]" />
                <div className="w-full flex flex-col items-center gap-[8px]">
                    <span onClick={() => navigate('/policy')}>약관 및 정보</span>
                    <span onClick={confirmAction}>회원 탈퇴</span>
                </div>
            </div>

        </div>
    )
}

export default MyPageMenuPage;
