interface PageHeaderProps {
  depth1: string;
  depth2: string;
  className?: string;
}

export default function PageHeader({
  depth1,
  depth2,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`w-full flex items-center px-[10px] py-[9px] border-y-[1.5px] border-[#58534E] ${className}`}
    >
      <div className="font-medium text-[16px] text-[#58534E] truncate w-full">
        <span>{depth1}</span>
        <span className="mx-[10px]">&gt;</span>
        <span>{depth2}</span>
      </div>
    </div>
  );
}
