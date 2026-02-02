import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <div>
      {label && <div className="mb-2 text-[14px] font-semibold">{label}</div>}
      <input
        {...props}
        className="h-[44px] w-full rounded-[12px] border border-[#E6E2DE] bg-white px-4 text-[14px] outline-none"
      />
    </div>
  );
}
