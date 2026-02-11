import { useEffect, useMemo, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // 입력값에 따라 필터링(선택사항)
  const filtered = useMemo(() => {
    const q = (domainValue || "").trim().toLowerCase();
    if (!q) return COMMON_DOMAINS;
    return COMMON_DOMAINS.filter((d) => d.toLowerCase().includes(q));
  }, [domainValue]);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const chooseDomain = (d: string) => {
    onDomainChange(d);
    setOpen(false);
  };

  return (
    <div className="w-full min-h-[53px] flex items-center gap-[5px]">
      <input
        type="text"
        placeholder={localPlaceholder}
        value={localValue}
        onChange={(e) => onLocalChange(e.target.value)}
        className="w-full h-[45px] rounded-[100px] py-[12px] px-[10px] font-regular text-[16px] text-[#58534E] border border-black/25 bg-[#FFFFFF] placeholder:text-[#BDB7B2] outline-none"
      />

      <div ref={wrapRef} className="relative max-w-[140px] w-full">
        <input
          type="text"
          placeholder={domainPlaceholder}
          value={domainValue}
          onChange={(e) => onDomainChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          autoComplete="off"
          className="w-full h-[45px] rounded-[100px] py-[12px] px-[10px] font-regular text-[16px] text-[#58534E] border border-black/25 bg-[#FFFFFF] placeholder:text-[#BDB7B2] outline-none"
        />

        {open && (
          <div
            className="absolute left-0 right-0 mt-[6px] z-50 rounded-[16px] border border-black/10 bg-white shadow-lg overflow-hidden"
            role="listbox"
          >
            <div className="max-h-[220px] overflow-auto py-[6px]">
              {filtered.length === 0 ? (
                <div className="px-[12px] py-[10px] text-[14px] text-[#BDB7B2]">
                  결과 없음
                </div>
              ) : (
                filtered.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()} // 포커스 날아가서 닫히는 것 방지
                    onClick={() => chooseDomain(d)}
                    className="w-full text-left px-[12px] py-[10px] text-[14px] text-[#58534E] hover:bg-black/5 active:bg-black/10"
                  >
                    {d}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
