import LoginButton from "../../components/LoginButton";
import { useState } from "react";
import SignupLabel from "../../components/SignupLabel";
import PassWordForm from "../../components/PassWordForm";
import TopLogo from "../../components/TopLogo";
import LoginTextInput from "../../components/LoginTextInput";
import Divider from "../../components/Divider";
import FormLabel from "../../components/FormLabel";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSignupStore } from "../../stores/signupStore";
import CheckIconGreen from "../../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../../assets/icons/checkIconRed.svg";
import CheckIcon from "../../assets/icons/checkIcon.svg";

const SignupPage2 = () => {
  const location = useLocation();

  const from = location.state && (location.state as any).from;

  if (from !== "SignupPage") {
    return <Navigate to="/signup/step1" replace />;
  }

  const navigate = useNavigate();
  const { signupData, setSignupData } = useSignupStore();

  const [password, setPassword] = useState(signupData.password || "");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  /** 👁 비밀번호 보기 토글 */
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  /** ===== 명세서 기준 비밀번호 조건 ===== */
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const hasLength = password.length >= 8;

  const typeCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
  const hasTwoTypes = typeCount >= 2;

  const isPasswordStarted = password.length > 0;

  const ruleColor = (ok: boolean) => {
    if (!isPasswordStarted) return "text-[#BDB7B2]";
    return ok ? "text-[#7FB77E]" : "text-[#D75D59]";
  };

  const ruleIcon = (ok: boolean) => {
    if (!isPasswordStarted) return CheckIcon;
    return ok ? CheckIconGreen : CheckIconRed;
  };

  const passwordsMatch =
    passwordConfirm.length > 0 && password === passwordConfirm;

  const handleNext = () => {
    if (!hasLength || !hasTwoTypes) {
      alert("비밀번호 조건을 확인해주세요.");
      return;
    }
    if (!passwordsMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setSignupData({
      password: password,
    });
    navigate("/signup/step3", {
      state: {
        from: "SignupPage2",
      }
    });
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
      <TopLogo />

      <div className="w-full px-[20px] pt-[20px] pb-[10px]">
        <SignupLabel />
      </div>

      <div className="w-full px-[20px] pt-[20px] pb-[10px]">
        <FormLabel label="비밀번호 생성" />
      </div>

      <div className="w-full px-[16px] pt-[4px] pb-[6px]">
        <PassWordForm
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호 입력"
          value={password}
          onChange={setPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
        />
      </div>

      <div className="w-full px-[20px] pb-[10px] flex items-center gap-[14px]">
        {/* 8자 이상 */}
        <span className={`flex items-center text-[14px] ${ruleColor(hasLength)}`}>
          <div className="w-[16px] h-[16px] mb-[2px]">
            <img src={ruleIcon(hasLength)} alt="" />
          </div>
          8자 이상
        </span>

        {/* 2종 이상 */}
        <span className={`flex items-center text-[14px] ${ruleColor(hasTwoTypes)}`}>
          <div className="w-[16px] h-[16px] mb-[2px]">
            <img src={ruleIcon(hasTwoTypes)} alt="" />
          </div>
          영문, 숫자, 특수문자 중 2종 사용
        </span>
      </div>

      <div className="w-full px-[16px] pt-[4px] pb-[6px]">
        <LoginTextInput
          type={showPasswordConfirm ? "text" : "password"}
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          onToggle={() => setShowPasswordConfirm((prev) => !prev)}
        />

        {passwordConfirm.length == 0 && (
          <div className="text-[14px] mt-[4px] px-[4px] text-[#BDB7B2] flex items-center">
            <img src={CheckIcon} alt="" />
            비밀번호 일치
          </div>
        )}

        {!passwordsMatch && passwordConfirm.length > 0 && (
          <div className="text-[14px] mt-[4px] px-[4px] text-[#DC3545] flex items-center">
            <img src={CheckIconRed} alt="" />
            비밀번호가 일치하지 않습니다.
          </div>
        )}

        {passwordsMatch && passwordConfirm.length > 0 && (
          <div className="text-[14px] mt-[4px] px-[4px] text-[#7FB77E] flex items-center">
            <img src={CheckIconGreen} alt="" />
            비밀번호가 일치합니다.
          </div>
        )}

        <div className="px-[16px] py-[10px]" />
        <Divider />
      </div>

      <div className="w-full pt-[45px] px-[16px] pb-[20px] flex justify-center">
        <LoginButton
          label="다음 단계로 이동"
          onClick={handleNext}
          disabled={(passwordsMatch || hasLength || hasTwoTypes) === false}
          variant={passwordsMatch && hasLength && hasTwoTypes ? "brown" : "lightBrown"}
        />
      </div>
    </div>
  );
};

export default SignupPage2;


// 최종 수정본