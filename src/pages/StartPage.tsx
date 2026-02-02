import { useNavigate } from "react-router-dom";
import socialLoginIcon from "../assets/icons/socialLoginIcon.svg"
import kakaoLoginIcon from "../assets/icons/kakaoLoginIcon.svg";
import logo from "../assets/icons/logo.svg";

const StartPage = () => {
  const navigate = useNavigate();
  const fontBase = "font-[Freesentation] font-medium text-[18px]";

  // 버튼: 폭은 반응형(w-full) + 최대폭(273px)
  const buttonBase =
    "w-full h-[45px] rounded-[100px] border border-black/25 flex items-center justify-center gap-[10px] px-[10px] py-[12px] items-stretch";

  const socialBtn = `${buttonBase} ${fontBase} bg-[#827A74] text-white`;
  const kakaoBtn = `${buttonBase} ${fontBase} bg-[#FFF3D0] text-[#58534E]`;
  const guestBtn = `${buttonBase} ${fontBase} bg-white text-[#58534E]`;
  const signupText = `${fontBase} text-[#58534E] underline`;


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
        <button className={socialBtn} onClick={() => navigate("/login")}><img src={socialLoginIcon} alt="" />소셜 로그인</button>
        <button className={kakaoBtn} onClick={() => { }}><img src={kakaoLoginIcon} alt="" />카카오 로그인</button>
        <button className={guestBtn} onClick={() => { }}>게스트 로그인</button>
        <div className="w-full h-[45px] flex items-center justify-center">
          <p className={signupText} onClick={() => navigate("/signup")}>회원가입</p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
