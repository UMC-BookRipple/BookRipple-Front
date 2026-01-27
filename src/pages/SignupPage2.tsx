import LoginButton from "../components/LoginButton";
import { useState } from "react";
import SignupLabel from "../components/SignupLabel";
import PassWordForm from "../components/PassWordForm";
import TopLogo from "../components/TopLogo";
import TextInput from "../components/TextInput";
import Divider from "../components/Divider";
import FormLabel from "../components/FormLabel";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../stores/signupStore";

const SignupPage2 = () => {
  const navigate = useNavigate();
  const { signupData, setSignupData } = useSignupStore();

  const [password, setPassword] = useState(signupData.password);
  const [passwordConfirm, setPasswordConfirm] = useState(signupData.password);

  const handleNext = () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setSignupData({ password });
    navigate("/signup/step3");
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
          label=""
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={setPassword}
        />
      </div>

      <div
        className="w-full px-[20px] pb-[10px] flex items-center text-[#BDB7B2]">
        <span><img src={checkIcon} alt="" />영문 포함</span>
        <span><img src={checkIcon} alt="" />숫자 포함</span>
        <span><img src={checkIcon} alt="" />8-12자 이내</span>
      </div>

      <div className="w-full px-[16px] pt-[4px] pb-[6px]">
        <TextInput
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />

        <div className="px-[16px] py-[10px]" />
        <Divider />
      </div>

      <div className="w-full h-[90px] px-[20px] py-[10px] flex flex-col justify-center gap-[10px]">
        <p className="text-[16px] text-[#58534E] flex items-center justify-between gap-[8px]">
          <img src={policyCheckIcon} alt="" />서비스 사용 설명서 동의
          <span className="text-[16px] text-[#58534E] underline"
            onClick={() => { }}>
            자세히 보기
          </span>
        </p>
        <p className="text-[16px] text-[#58534E] flex items-center gap-[8px]">
          <img src={policyCheckIcon} alt="" />생년월일 정보 수집(선택)
        </p>
      </div>

      <div className="w-full pt-[45px] px-[16px] pb-[20px] flex justify-center">
        <LoginButton label="정보 작성" onClick={handleNext} />
      </div>
    </div>
  );
};

export default SignupPage2;
