interface ReadingMarkProps {
  bookName: string;
}

const clampText = (text: string, max: number) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
};

const ReadingMark = ({ bookName }: ReadingMarkProps) => {
  const displayName = clampText(bookName, 20);

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex h-[27px] w-[53px] items-center justify-center rounded-[25px] bg-[#827A74] font-sans text-[16px] font-medium whitespace-nowrap text-[#FFFFFF]">
        독서중
      </div>
      <span className="font-sans text-[18px] font-medium whitespace-nowrap text-[#58534E]">
        {displayName}
      </span>
    </div>
  );
};

export default ReadingMark;
