type EmailInputProps = {
  localValue: string;
  domainValue: string;
  onLocalChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  localPlaceholder?: string;
  domainPlaceholder?: string;
};

const COMMON_DOMAINS = [
  "@naver.com",
  "@gmail.com",
  "@kakao.com",
  "@hanmail.net",
  "@outlook.com",
  "@yahoo.com",
];

const EmailInput = ({
  localValue,
  domainValue,
  onLocalChange,
  onDomainChange,
  localPlaceholder = "이메일을 입력하세요",
  domainPlaceholder = "@naver.com",
}: EmailInputProps) => {
  return (
    <div className="w-full min-h-[53px] flex items-center gap-[5px]">
      <input
        placeholder={localPlaceholder}
        value={localValue}
        onChange={(e) => onLocalChange(e.target.value)}
        type="text"
        className="w-full h-[45px] rounded-[100px] py-[12px] px-[10px] font-[Freesentation] font-regular text-[16px] text-[#58534E] border border-black/25 bg-white placeholder:text-[#BDB7B2] outline-none"
      />

      <div className="max-w-[140px] w-full">
        <input
          list="email-domain-list"
          placeholder={domainPlaceholder}
          value={domainValue}
          onChange={(e) => onDomainChange(e.target.value)}
          type="text"
          className="w-full h-[45px] rounded-[100px] py-[12px] px-[10px] font-[Freesentation] font-regular text-[16px] text-[#58534E] border border-black/25 bg-white placeholder:text-[#BDB7B2] outline-none"
        />
        <datalist id="email-domain-list">
          {COMMON_DOMAINS.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default EmailInput;
