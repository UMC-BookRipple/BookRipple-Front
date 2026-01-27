interface ReadCompleteMarkProps {
  bookName: string;
}

const ReadCompleteMark = ({ bookName }: ReadCompleteMarkProps) => {
  return (
    <div className="flex flex-row items-center gap-[7px]">
      <div className="flex h-[27px] w-[65px] items-center justify-center rounded-[20px] bg-[#827A74] font-sans text-[16px] font-medium whitespace-nowrap text-[#FFFFFF]">
        독서완료
      </div>
      <span className="font-sans text-[18px] font-medium whitespace-nowrap text-[#58534E]">
        {bookName}
      </span>
    </div>
  );
};

export default ReadCompleteMark;
