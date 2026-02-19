import React from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function TabButton({
  active,
  onClick,
  children,
}: TabButtonProps) {
  return (
    <button
      className={`flex min-w-0 flex-1 items-center justify-center gap-[10px] rounded-[10px] px-[12px] py-[12px] sm:px-[20px] ${
        active ? 'bg-[#BDB7B2]' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <span
        className={`text-[16px] leading-normal font-medium ${
          active ? 'text-white' : 'text-[#58534E]'
        }`}
      >
        {children}
      </span>
    </button>
  );
}
