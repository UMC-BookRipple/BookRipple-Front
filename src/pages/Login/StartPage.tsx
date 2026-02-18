import { useNavigate } from "react-router-dom";
import socialLoginIcon from "../../assets/icons/socialLoginIcon.svg"
import kakaoLoginIcon from "../../assets/icons/kakaoLoginIcon.svg";
import logo from "../../assets/icons/logo.svg";
import { http } from "../../types/http";
import { useAuthStore } from "../../stores/authStore";

const StartPage = () => {
  const navigate = useNavigate();

  const fontBase = "font-[Freesentation] font-medium text-[18px]";

  // 버튼: 폭은 반응형(w-full) + 최대폭(273px)
  const buttonBase =
    "w-full rounded-[100px] border border-black/25 flex items-center justify-center gap-[10px] px-[10px] py-[12px] items-stretch border-b-rgba(0, 0, 0, 0.25)";

  const socialBtn = `${buttonBase} ${fontBase} bg-[#827A74] text-white`;
  const kakaoBtn = `${buttonBase} ${fontBase} bg-[#FFE8A9] text-[#58534E]`;
  const guestBtn = `${buttonBase} ${fontBase} bg-white text-[#58534E]`;
  const signupText = `${fontBase} text-[#58534E] underline`;

  // 카카오 로그인
  const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;
  const K_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI as string;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

const guestLogin = async () => {
  try {
    const res = await http.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login/guest`
    );

    const { isSuccess, message, result } = res.data;

    // ✅ 실패면 바로 처리하고 종료 (result가 없을 수도 있으니 안전)
    if (!isSuccess) {
      console.log("guest login failed:", message);
      alert(message);
      navigate("/start");
      return;
    }

    // ✅ 성공 처리
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("userName", result.userName);
    localStorage.setItem("memberId", String(result.memberId));

    // ✅ zustand auth 상태 갱신 (중요)
    useAuthStore.getState().login(); // 또는 .checkAuth()

    console.log("guest login success:", message);
    navigate("/bookshelf/reading");
  } catch (error) {
    console.log("guest login error", error);
    alert("로그인에 실패했습니다.");
    navigate("/start");
  }
};

  return (
    <div className="min-h-dvh w-full bg-[#F7F5F1] flex flex-col items-center">
      <div className="w-full h-[562px] flex flex-col items-center justify-center mt-[50px]">
        <img
          src={logo}
          alt="BookRipple Logo"
          className="w-[382px] h-[95.6px]"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-[12px] pb-[20px] px-[64.5px]">
        <button className={socialBtn} onClick={() => navigate("/auth/login/local")}><img src={socialLoginIcon} alt="" />로그인</button>
        <button className={kakaoBtn} onClick={handleKakaoLogin}><img src={kakaoLoginIcon} alt="" />카카오 로그인</button>
        <button className={guestBtn} onClick={guestLogin}>게스트 로그인</button>
        <div className="w-full h-[45px] flex items-center justify-center">
          <p className={signupText} onClick={() => navigate("/signup/step1")}>회원가입</p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
