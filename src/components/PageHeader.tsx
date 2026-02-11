interface PageHeaderProps {
  depth1: string;
  depth2: string;
  actionLabel?: string;
  onAction?: () => void;
  onBack?: () => void;
  className?: string;
}

const clampText = (text: string, max: number) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
};

export default function PageHeader({
  depth1,
  depth2,
  actionLabel,
  onAction,
  onBack,
  className = '',
}: PageHeaderProps) {
  const depth1Clamped = clampText(depth1, 15);

  return (
    <div
      className={`flex items-center gap-[10px] self-stretch border-y-[1.3px] border-[#58534E] p-[8px] ${className}`}
    >
      <div className="min-w-0 flex-1 font-sans text-[16px] leading-normal font-medium text-[#58534E]">
        <div className="truncate">
          <span onClick={onBack} className="cursor-pointer">
            {depth1Clamped}
          </span>
          <span className="mx-[10px]">&gt;</span>
          <span>{depth2}</span>
        </div>
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="ml-3 shrink-0 text-[14px] font-medium text-[#58534E]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
