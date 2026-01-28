import LoginButton from "../components/LoginButton";
import SignupLabel from "../components/SignupLabel";
import TopLogo from "../components/TopLogo";
import FormLabel from "../components/FormLabel";
import InputWithButton from "../components/InputWithButton";
import EmailInput from "../components/EmailInput";
import Divider from "../components/Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignupStore } from "../stores/signupStore";
import CheckIcon from "../assets/icons/checkIcon.svg";
import LoginTextInput from "../components/LoginTextInput";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignupPage = () => {

  const navigate = useNavigate();
  const { setSignupData } = useSignupStore();

  const [loginId, setLoginId] = useState("");
  const [localValue, setLocalValue] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);

    setTimeout(() => {
    setToastVisible(false);
    }, 2000); 
  };


  const [idCheckStatus, setIdCheckStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailAuthStatus, setEmailAuthStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const verifyId = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/auth/check-id`,
        { params: { loginId } }
      );

      const { isSuccess, code, message } = response.data;

      if (isSuccess) {
        setIdCheckStatus('success');
      } else {
        console.log(`코드:${code}, 메시지:${message}`);
        setIdCheckStatus('error');
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
    }
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/email/send`,
        { email: `${localValue}${domainValue}` }
      );

      const { isSuccess, code, message, result } = response.data;

      if (isSuccess) {
        console.log("이메일 전송 성공", result);
        showToast("메일을 전송하였습니다");
      } else {
        console.log(`코드:${code}, 메시지:${message}`);
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
    }
  };

  const verifyEmailCode = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/email/verify`,
        { email: `${localValue}${domainValue}`, authCode: authCode }
      );

      const { isSuccess } = response.data;

      if (isSuccess) {
        setEmailAuthStatus('success');
      } else {
        setEmailAuthStatus('error');
      }
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setEmailAuthStatus('error');
    }
  };



  return (
    <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
      <div className="w-full flex flex-col items-center">
        <TopLogo />

        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <SignupLabel />
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

          {idCheckStatus === 'success' && (
            <p className="text-[14px] text-[#28A745] flex flex-row items-center mt-[4px] px-[4px]">
              <img src={CheckIcon} alt="" className="mb-[2px]" />
              사용할 수 있는 아이디입니다.
            </p>
          )}
          {idCheckStatus === 'error' && (
            <p className="text-[14px] text-[#DC3545] flex flex-row items-center mt-[4px] px-[4px]">
              <img src={CheckIcon} alt="" className="mb-[2px]" />
              사용할 수 없는 아이디입니다.
            </p>
          )}
        </div>

        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <FormLabel label="이메일 인증" />
        </div>

        <div className="w-full px-[16px] py-[4px] gap-[10px] flex flex-col">
          <EmailInput
            localValue={localValue}
            domainValue={domainValue}
            onLocalChange={setLocalValue}
            onDomainChange={setDomainValue}
          />
          <LoginTextInput 
          placeholder="인증 코드 입력" 
          value={authCode} 
          onChange={setAuthCode} 
          type="text" />
        </div>


        <div className="w-full h-auto min-h-[95px] px-[16px] py-[10px] gap-[10px] flex flex-col items-start justify-center">
          <LoginButton label="이메일 인증하기" onClick={verifyEmailCode} variant="lightBrown" />
          {emailAuthStatus === 'success' && (
            <p className="text-[16px] text-[#28A745] mt-[4px] px-[4px]">인증이 완료되었습니다.</p>
          )}
          {emailAuthStatus === 'error' && (
            <p className="text-[16px] text-[#DC3545] mt-[4px] px-[4px]">인증에 실패했습니다.</p>
          )}
          <div className="w-full px-[4px] py-[10px]">

            <Divider />
          </div>
        </div>


        <div className="w-full h-[114px] px-[16px] pt-[45px] pb-[20px] flex flex-col items-center">
          <LoginButton
            label="비밀번호 설정하기"
            onClick={() => {
              setSignupData({
                loginId,
                email: `${localValue}${domainValue}`
              });
              navigate("/signup/step2");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
