import LoginButton from "../components/LoginButton";
import SignupLabel from "../components/SignupLabel";
import TopLogo from "../components/TopLogo";
import FormLabel from "../components/FormLabel";
import InputWithButton from "../components/InputWithButton";
import EmailInput from "../components/EmailInput";
import Divider from "../components/Divider";

const SignupPage = () => {

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
            value={""}
            onChange={() => { }}
            buttonLabel="중복확인"
            onButtonClick={() => { }}
          />
        </div>

        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <FormLabel label="이메일 인증" />
        </div>

        <div className="w-full px-[16px] py-[4px]">
          <EmailInput
            localValue={""}
            domainValue={""}
            onLocalChange={() => { }}
            onDomainChange={() => { }}
          />
        </div>


        {/* email code 없는 경우 */}
        <div className="w-full h-[95px] px-[16px] py-[10px] gap-[10px] flex flex-col items-center justify-center">
          <LoginButton label="이메일 인증하기" onClick={() => { }} variant="lightBrown" />
          <div className="w-full px-[16px] py-[10px]">
            <Divider />
          </div>
        </div>


        {/* {emailCode && (
          <div className="w-full h-[95px] px-[16px] py-[10px] gap-[10px] flex flex-col items-center justify-center">
            <TextInput placeholder="인증코드를 입력하세요" value={emailCode} onChange={setEmailCode} />
            <LoginButton label="이메일 인증하기" onClick={emailVerify} variant="brown" />
            <div className="w-full px-[16px] py-[10px]">
              <Divider />
            </div>
          </div>
        )} */}

        <div className="w-full h-[114px] px-[16px] pt-[45px] pb-[20px] flex flex-col items-center">
          <LoginButton label="비밀번호 설정하기" onClick={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
