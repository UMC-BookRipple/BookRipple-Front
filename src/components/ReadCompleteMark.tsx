interface ReadCompleteMarkProps {
  bookName: string;
}

const clampText = (text: string, max: number) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
};

const ReadCompleteMark = ({ bookName }: ReadCompleteMarkProps) => {
  const displayName = clampText(bookName, 20);

  return (
    <div className="flex flex-row items-center gap-[7px]">
      <div className="flex h-[27px] w-[65px] items-center justify-center rounded-[20px] bg-[#827A74] font-sans text-[16px] font-medium whitespace-nowrap text-[#FFFFFF]">
        독서완료
      </div>
      <span className="font-sans text-[18px] font-medium whitespace-nowrap text-[#58534E]">
        {displayName}
      </span>
    </div>
  );
};

export default ReadCompleteMark;
