type InputWithButtonProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  buttonLabel: string;
  onButtonClick: () => void;
  active?: boolean;
};

const InputWithButton = ({
  placeholder,
  value,
  onChange,
  buttonLabel,
  onButtonClick,
  active = false,
}: InputWithButtonProps) => {

  const buttonColor = active
    ? "bg-[#58534E]"
    : "bg-[#827A74]";

  return (
    <div className="w-full h-[45px] rounded-[100px] border border-black/25 bg-white flex items-center px-[12px] gap-[8px]">
      <input
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="w-full h-[45px] bg-transparent font-[Freesentation] text-[16px] text-[#58534E] placeholder:text-[#BDB7B2] outline-none"
      />

      <button
        type="button"
        onClick={onButtonClick}
        className={`max-w-[59px] flex items-center justify-center h-[24px] rounded-[20px] py-[4px] px-[8px] font-[Freesentation] text-[14px] text-white border border-black/25 whitespace-nowrap ${buttonColor}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default InputWithButton;
