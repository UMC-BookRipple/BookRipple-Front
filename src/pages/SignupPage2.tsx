import LoginButton from "../components/LoginButton";
import { useState } from "react";
import SignupLabel from "../components/SignupLabel";
import PassWordForm from "../components/PassWordForm";
import TopLogo from "../components/TopLogo";
import LoginTextInput from "../components/LoginTextInput";
import Divider from "../components/Divider";
import FormLabel from "../components/FormLabel";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../stores/signupStore";
import policyCheckIcon from "../assets/icons/policyCheckIcon.svg";
import CheckIcon from "../assets/icons/checkIcon.svg";
import checkCompleteIcon from "../assets/icons/checkCompleteIcon.svg";

const SignupPage2 = () => {
  const navigate = useNavigate();
  const { signupData, setSignupData } = useSignupStore();

  const [password, setPassword] = useState(signupData.password);
  const [passwordConfirm, setPasswordConfirm] = useState(signupData.password);

  const [isTermsAgreedRequired, setIsTermsAgreedRequired] = useState(false);
  const [isTermsAgreedOptional, setIsTermsAgreedOptional] = useState(false);

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasLength = password.length >= 8 && password.length <= 12;

  const isPasswordStarted = password.length > 0;

  // 색상 결정
  const ruleColor = (ok: boolean) => {
    if (!isPasswordStarted) return "text-[#BDB7B2]";
    return ok ? "text-[#7FB77E]" : "text-[#D75D59]";
  };

  const passwordsMatch = password && password === passwordConfirm;
  const isConfirmStarted = passwordConfirm.length > 0;



  const handleNext = () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setSignupData({
      password,
      isTermsAgreedRequired,
      isTermsAgreedOptional
    });
    navigate("/signup/step3");
  };

  const agreeRequired = () => {
    setIsTermsAgreedRequired(!isTermsAgreedRequired);
  }

  const agreeOptional = () => {
    setIsTermsAgreedOptional(!isTermsAgreedOptional);
  }


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
          label=""
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={setPassword}
        />
      </div>

      <div className="w-full px-[20px] pb-[10px] flex items-center gap-[14px]">

        {/* 영문 포함 */}
        <span className={`flex flex-row items-center text-[14px] ${ruleColor(hasLetter)}`}>
          <div className="w-[16px] h-[16px] mb-[2px]">
            <img src={CheckIcon} alt="" />
          </div>
          영문 포함
        </span>

        {/* 숫자 포함 */}
        <span className={`flex flex-row items-center text-[14px] ${ruleColor(hasNumber)}`}>
          <div className="w-[16px] h-[16px] mb-[2px]">
            <img src={CheckIcon} alt="" />
          </div>
          숫자 포함
        </span>

        {/* 8~12자 */}
        <span className={`flex flex-row items-center text-[14px] ${ruleColor(hasLength)}`}>
          <div className="w-[16px] h-[16px] mb-[2px]">
            <img src={CheckIcon} alt="" />
          </div>
          8-12자 이내
        </span>

      </div>


      <div className="w-full px-[16px] pt-[4px] pb-[6px]">
        <LoginTextInput
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        {isConfirmStarted && !passwordsMatch && (
          <div className="text-[14px] mt-[4px] px-[4px] text-[#DC3545] flex items-center gap-[6px]">
            <img src={CheckIcon} alt="" />
            비밀번호가 일치하지 않습니다.
          </div>
        )}
        <div className="px-[16px] py-[10px]" />
        <Divider />
      </div>

      <div className="w-full h-[90px] px-[20px] py-[10px] flex flex-col justify-center gap-[10px]">
        <p className="text-[16px] text-[#58534E] flex items-center justify-between gap-[8px]">
          <div className="flex flex-row items-center gap-[8px]">
            <img alt="" onClick={agreeRequired}
              src={isTermsAgreedRequired ? checkCompleteIcon : policyCheckIcon} className="w-[34px] h-[34px]" />서비스 사용 설명서 동의
          </div>
          <span className="text-[16px] text-[#58534E] underline"
            onClick={() => { }}>
            자세히 보기
          </span>
        </p>
        <p className="text-[16px] text-[#58534E] flex items-center gap-[8px]">
          <img alt="" onClick={agreeOptional}
            src={isTermsAgreedOptional ? checkCompleteIcon : policyCheckIcon} className="w-[34px] h-[34px]" />생년월일 정보 수집(선택)
        </p>
      </div>

      <div className="w-full pt-[45px] px-[16px] pb-[20px] flex justify-center">
        <LoginButton
          label="정보 작성"
          onClick={handleNext}
          disabled={!isTermsAgreedRequired}
          variant={isTermsAgreedRequired ? "brown" : "lightBrown"}
        />
      </div>
    </div>
  );
};

export default SignupPage2;
