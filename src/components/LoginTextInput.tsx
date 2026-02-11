import closeEyeIcon from "../assets/icons/closeEyeIcon.svg";
import openEyeIcon from "../assets/icons/openEyeIcon.svg";

interface LoginTextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  onToggle?: () => void;
  rightText?: string;
}

const LoginTextInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "w-full h-[45px] rounded-[100px] border border-black/25 bg-[#FFFFFF] flex items-center px-[10px] py-[12px] gap-[10px] font-regular text-[16px] text-[#58534E] placeholder:text-[#BDB7B2] outline-none",
  onToggle,
  rightText,
}: LoginTextInputProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />

      {/* 👉 오른쪽 영역 */}
      {rightText ? (
        <span className="absolute right-[16px] text-[14px] text-[#D75D59]">
          {rightText}
        </span>
      ) : onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-[16px]"
        >
          {type === "password" ? (
            <img src={closeEyeIcon} alt="비밀번호 숨기기" />
          ) : (
            <img src={openEyeIcon} alt="비밀번호 보기" />
          )}
        </button>
      ) : null}
    </div>
  );
};


export default LoginTextInput;
