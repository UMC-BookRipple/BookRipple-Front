type EmailInputProps = {
  localValue: string;
  domainValue: string;
  onLocalChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  localPlaceholder?: string;
  domainPlaceholder?: string;
};

const EmailInput = ({
  localValue,
  domainValue,
  onLocalChange,
  onDomainChange,
}: EmailInputProps) => {
  return (
    <div className="w-full min-h-[53px] flex items-center gap-[5px]">
      <input
        placeholder="이메일을 입력하세요"
        value={localValue}
        onChange={(e) => onLocalChange(e.target.value)}
        className="w-full h-[45px] rounded-[100px] py-[12px] px-[10px] font-[Freesentation] font-regular text-[16px] text-[#58534E] border border-black/25 bg-white placeholder:text-[#BDB7B2] outline-none"
      />
      <input
        placeholder="naver.com"
        value={domainValue}
        onChange={(e) => onDomainChange(e.target.value)}
        className="max-w-[95px] h-[45px] rounded-[100px] py-[12px] px-[10px] font-[Freesentation] font-regular text-[16px] text-[#58534E] border border-black/25 bg-white placeholder:text-[#BDB7B2] outline-none"
      />
    </div>
  );
};

export default EmailInput;
