import type { ReactNode } from 'react';

interface BookshelfSectionProps {
  title: string;
  type: 'toggle' | 'navigation';
  isOpen?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  children?: ReactNode;
}

export default function BookshelfSection({
  title,
  type,
  isOpen = false,
  onToggle,
  onClick,
  children,
}: BookshelfSectionProps) {
  const handleClick = () => {
    if (type === 'toggle' && onToggle) {
      onToggle();
    } else if (type === 'navigation' && onClick) {
      onClick();
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-0 py-[10px]">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center self-stretch border-t border-b border-[#58534E] px-0 py-[10px]"
      >
        <span className="flex flex-1 items-center gap-[10px] px-[5px] font-[Freesentation] text-[16px] leading-normal font-[500] text-[#58534E]">
          {title}
        </span>
        {type === 'toggle' && (
          <svg
            width="17"
            height="8"
            viewBox="0 0 17 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`mr-[5px] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M1 1L8.5 7L16 1"
              stroke="#58534E"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {type === 'toggle' && isOpen && children && (
        <div className="flex w-full flex-col items-center gap-[10px] border-b border-[#58534E] px-0 py-[10px]">
          {children}
        </div>
      )}
    </div>
  );
}
