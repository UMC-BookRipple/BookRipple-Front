import FormLabel from "./FormLabel";
import LoginTextInput from "./LoginTextInput";
import Divider from "./Divider";
import CheckIconRed from "../assets/icons/checkIconRed.svg";

type LoginFormBodyProps = {
  userId: string;
  password: string;
  onChangeUserId: (value: string) => void;
  onChangePassword: (value: string) => void;
  wrongLogin?: boolean;
  onToggle?: () => void;
  showPassword: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const LoginFormBody = ({
  userId,
  password,
  onChangeUserId,
  onChangePassword,
  wrongLogin = false,
  onToggle,
  showPassword,
  handleSubmit,
}: LoginFormBodyProps) => {
  return (
    <div className="w-full flex flex-col items-center bg-[#F7F5F1]">
      {/* 타이틀 */}
      <div className="w-full px-[20px] pt-[20px]">
        <p className="font-[Freesentation] font-medium text-[18px] text-[#58534E]">
          북 리플 로그인
        </p>
      </div>

      {/* 구분선 */}
      <div className="w-full px-[16px]">
        <Divider />
      </div>

      {/* 아이디 */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <FormLabel label="아이디" />
        </div>
        <div className="w-full px-[16px] py-[4px]">
          <LoginTextInput
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={onChangeUserId}
          />
        </div>

        {/* 비밀번호 */}
        <div className="w-full px-[20px] pt-[20px] pb-[10px]">
          <FormLabel label="비밀번호" />
        </div>
        <div className="w-full px-[16px] py-[4px]">
          <LoginTextInput
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onChangePassword}
            onToggle={onToggle}
          />

          {wrongLogin && (
            <p className="flex flex-row itmes-start mt-[6px] text-[#DC3545] text-[16px]">
              <img src={CheckIconRed} alt="" />
              입력된 정보가 올바르지 않습니다
            </p>
          )}
        </div>
      </form>

      {/* 하단 구분선 */}
      <div className="w-full px-[16px] pt-[30px] pb-[20px]">
        <Divider />
      </div>
    </div>
  );
};

export default LoginFormBody;
