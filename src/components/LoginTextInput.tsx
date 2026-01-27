interface LoginTextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}

const LoginTextInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "w-full h-[45px] rounded-[100px] border border-black/25 bg-[#FFFFFF] flex items-center px-[10px] py-[12px] gap-[10px]",
}: LoginTextInputProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
};

export default LoginTextInput;
