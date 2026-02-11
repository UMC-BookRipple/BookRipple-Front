import LoginButton from "../../components/LoginButton";
import SignupLabel from "../../components/SignupLabel";
import TopLogo from "../../components/TopLogo";
import FormLabel from "../../components/FormLabel";
import InputWithButton from "../../components/InputWithButton";
import Divider from "../../components/Divider";
import axios from "axios";
import { useState } from "react";
import { useSignupStore } from "../../stores/signupStore";
import CheckIconGreen from "../../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../../assets/icons/checkIconRed.svg";
import LoginTextInput from "../../components/LoginTextInput";
import policyCheckIcon from "../../assets/icons/policyCheckIcon.svg";
import checkCompleteIcon from "../../assets/icons/checkCompleteIcon.svg";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const { setSignupData, signupData } = useSignupStore();

  const [name, setName] = useState<string>(signupData.name || "");
  const [loginId, setLoginId] = useState(signupData.loginId || "");

  const [idCheckStatus, setIdCheckStatus] =
    useState<"idle" | "success" | "error">("idle");

  const [isTermsAgreedRequired, setIsTermsAgreedRequired] = useState(signupData.isRequiredAgreed || false);
  const [isTermsAgreedOptional, setIsTermsAgreedOptional] = useState(signupData.isOptionalAgreed || false);

  const verifyId = async () => {
    if (!loginId.trim()) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/check-id`,
        { params: { loginId } }
      );

      setIdCheckStatus(response.data.isSuccess ? "success" : "error");
    } catch {
      setIdCheckStatus("error");
    }
  };

  const handleNext = () => {
    if (!isTermsAgreedRequired) {
      alert("서비스 사용 설명서 동의가 필요합니다.");
      return;
    }

    setSignupData({
      name: name,
      loginId: loginId,
      isRequiredAgreed: isTermsAgreedRequired,
      isOptionalAgreed: isTermsAgreedOptional,
    });
    navigate("/signup/step2", {
      state: {
        from: "SignupPage"
      }
    });
  };

  const handlePolicyClick = () => {
    setSignupData({
      name: name,
      loginId: loginId,
      isRequiredAgreed: isTermsAgreedRequired,
      isOptionalAgreed: isTermsAgreedOptional,
    });
    navigate('/policy');
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
      <div className="w-full flex flex-col items-center">
        <TopLogo />

        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <SignupLabel />
        </div>

        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <FormLabel label="이름 작성" />
        </div>

        <div className="w-full px-[16px] pt-[4px] pb-[6px]">
          <LoginTextInput placeholder="이름 입력" value={name} onChange={setName} />
        </div>

        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <FormLabel label="아이디 생성" />
        </div>

        <div className="w-full p-[16px] py-[4px]">
          <InputWithButton
            placeholder="아이디를 입력하세요"
            value={loginId}
            onChange={(val: string) => {
              setLoginId(val);
              setIdCheckStatus("idle");
            }}
            buttonLabel="중복확인"
            onButtonClick={verifyId}
            active={loginId.trim().length > 0}
          />

          {idCheckStatus === "success" && (
            <p className="w-full text-[14px] text-[#28A745] flex items-center mt-[4px] px-[4px]">
              <img src={CheckIconGreen} alt="" className="mb-[2px]" />
              사용 가능한 아이디입니다.
            </p>
          )}

          {idCheckStatus === "error" && (
            <p className="w-full text-[14px] text-[#DC3545] flex items-center mt-[4px] px-[4px]">
              <img src={CheckIconRed} alt="" className="mb-[2px]" />
              사용할 수 없는 아이디입니다.
            </p>
          )}

          <div className="w-full px-[4px] py-[10px] mt-[10px]">
            <Divider />
          </div>
        </div>

        <div className="w-full h-[90px] px-[20px] py-[10px] flex flex-col justify-center gap-[10px]">
          <p className="text-[16px] text-[#58534E] flex items-center justify-between">
            <span className="flex items-center gap-[8px]">
              <img
                src={isTermsAgreedRequired ? checkCompleteIcon : policyCheckIcon}
                onClick={() => setIsTermsAgreedRequired(prev => !prev)}
                className="w-[34px] h-[34px]"
              />
              서비스 사용 설명서 동의
            </span>
            <span className="underline"
              onClick={handlePolicyClick}>자세히 보기</span>
          </p>

          <p className="text-[16px] text-[#58534E] flex items-center gap-[8px]">
            <img
              src={isTermsAgreedOptional ? checkCompleteIcon : policyCheckIcon}
              onClick={() => setIsTermsAgreedOptional(prev => !prev)}
              className="w-[34px] h-[34px]"
            />
            생년월일 정보 수집(선택)
          </p>
        </div>

        <div className="w-full pt-[45px] px-[16px] pb-[20px] flex items-center justify-center">
          <LoginButton
            label="다음 단계로 이동"
            onClick={handleNext}
            disabled={!isTermsAgreedRequired && name.length > 0 && idCheckStatus === "success"}
            variant={isTermsAgreedRequired && name.length > 0 && idCheckStatus === "success" ? "brown" : "lightBrown"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

