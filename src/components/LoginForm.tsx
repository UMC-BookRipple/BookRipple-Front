type LoginFormBodyProps = {
  userId: string;
  password: string;
  onChangeUserId: (value: string) => void;
  onChangePassword: (value: string) => void;
};

const LoginFormBody = ({
  userId,
  password,
  onChangeUserId,
  onChangePassword,
}: LoginFormBodyProps) => {
  const labelClass = "font-[Freesentation] text-[16px] text-[#58534E]";
  const inputClass =
    "w-full h-[45px] rounded-[100px] px-[6px] font-[Freesentation] font-regular text-[16px] text-[#BDB7B2] border border-black/25 bg-[#FFFFFF]";

  return (
    <div className="bg-[#F7F5F1] w-[402px] flex flex-col items-center">
      <div className="w-[402px] h-[41px] box-border pt-[20px] pl-[20px] flex items-center justify-start">
        <p className="font-[Freesentation] font-medium text-[18px] text-[#58534E] text-left">
          북 리플 로그인
        </p>
      </div>

      <div className="w-[402px] h-[20px] box-border px-[16px] py-[10px] relative">
        <div className="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 h-[0.7px] bg-[#58534E]" />
      </div>

      <div className="w-[402px] h-[49px] box-border px-[20px] pt-[20px] pb-[10px] flex items-center">
        <p className={labelClass}>아이디</p>
      </div>

      <div className="w-[402px] h-[53px] box-border px-[16px] py-[4px] bg-[#F7F5F1]">
        <input
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => onChangeUserId(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="w-[402px] h-[49px] box-border px-[20px] pt-[20px] pb-[10px] flex items-center">
        <p className={labelClass}>비밀번호</p>
      </div>

      <div className="w-[402px] h-[53px] box-border px-[16px] py-[4px] bg-[#F7F5F1]">
        <input
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="w-[402px] h-[50px] box-border pt-[20px] px-[16px] pb-[10px] flex items-center">
        <div className="w-full h-[0.7px] bg-[#58534E]" />
      </div>
    </div>
  );
};

export default LoginFormBody;
