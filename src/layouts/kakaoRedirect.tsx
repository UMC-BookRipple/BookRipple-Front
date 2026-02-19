import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../types/http";
import { useAuthStore } from "../stores/authStore";

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
    memberId: string;
    userName: string;
    isNewMember: boolean;
  };
  code: string;
}

const KakaoRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get("code");

    console.log("추출한 code:", kakaoCode);

    if (kakaoCode) {
      handleLogin(kakaoCode);
    } else {
      alert("인가 코드가 없습니다.");
      navigate("/start");
    }
  }, [navigate]);


  const handleLogin = async (kakaoCode: string) => {

    console.log(kakaoCode)
    try {
      const res = await http.post<LoginResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/kakao`,
        {
          content: kakaoCode,
        });

      const { isSuccess, message, result, code } = res.data;

      if (!isSuccess) {
      alert(message);
      navigate("/start");
      return;
    }

    // ✅ 토큰 저장
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("memberId", result.memberId);
    localStorage.setItem("userName", result.userName);

    // ✅ Zustand 상태 즉시 갱신 (핵심)
    useAuthStore.getState().login(); 
    // 또는 useAuthStore.getState().checkAuth();

    console.log("카카오 로그인 완료");
    navigate("/bookshelf/reading");

  } catch (error) {
    console.error("카카오 로그인 통신 에러:", error);
    alert("서버와 통신 중 에러가 발생했습니다.");
    navigate("/start");
  }
};
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#F7F5F1]">
      <p className="font-[Freesentation] text-[#58534E]">로그인 중입니다...</p>
    </div>
  );
};

export default KakaoRedirect;