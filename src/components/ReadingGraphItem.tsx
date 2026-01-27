const ReadingGraphItem = ({ dayLabel, percent }: { dayLabel: string, percent: number }) => {
    return (
        <div
            className="flex flex-col items-center justify-center gap-[8px] w-[40px] h-[153px]">
            <div
                className="w-[40px] h-[40px] rounded-[500px] bg-[#FFF] border-[0.5px] border-[#BDB7B2] flex items-center justify-center font-[Freesentation] text-[16px] text-[#58534E] font-weight-[500]">{dayLabel}</div>
            <div
                className="w-[34px] h-[105px] bg-[#FFF] border-[0.5px] border-[#BDB7B2] rounded-[20px] flex items-end">
                <div
                    className={`w-full bg-[#BDB7B2] rounded-b-[20px] transition-all ${percent === 100 ? 'rounded-t-[20px]' : ''}`} style={{ height: `${percent}%` }} />
            </div>
        </div>
    );
};

export default ReadingGraphItem;
