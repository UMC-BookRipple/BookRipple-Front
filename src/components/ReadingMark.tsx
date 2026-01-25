interface ReadingMarkProps {
    bookName: string;
}

const ReadingMark = ({ bookName }: ReadingMarkProps) => {
    return (
        <div 
        className="flex flex-row items-center gap-2">
            <div className="w-[53px] h-[27px] rounded-[25px] bg-[#827A74] text-[#FFFFFF] text-[16px] flex items-center justify-center font-[Freesentation] font-medium whitespace-nowrap">독서중
            </div>
            <span className="text-[#58534E] text-[18px] font-[Freesentation] font-medium whitespace-nowrap">{bookName}</span>
        </div>
    );
};

export default ReadingMark;
