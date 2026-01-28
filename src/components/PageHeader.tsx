interface PageHeaderProps {
  depth1: string;
  depth2: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function PageHeader({
  depth1,
  depth2,
  actionLabel,
  onAction,
  className = '',
}: PageHeaderProps) {
  return (
    <div
      className={`flex items-center gap-[10px] self-stretch border-y-[1.3px] border-[#58534E] p-[8px] ${className}`}
    >
      <div className="w-full truncate font-sans text-[16px] leading-normal font-medium text-[#58534E]">
        <span>{depth1}</span>
        <span className="mx-[10px]">&gt;</span>
        <span>{depth2}</span>
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
