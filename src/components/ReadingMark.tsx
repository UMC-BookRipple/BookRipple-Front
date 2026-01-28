interface ReadingMarkProps {
  bookName: string;
}

const ReadingMark = ({ bookName }: ReadingMarkProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex h-[27px] w-[53px] items-center justify-center rounded-[25px] bg-[#827A74] font-[Freesentation] text-[16px] font-medium whitespace-nowrap text-[#FFFFFF]">
        독서중
      </div>
      <span className="font-sans text-[18px] font-medium whitespace-nowrap text-[#58534E]">
        {bookName}
      </span>
    </div>
  );
};

export default ReadingMark;
