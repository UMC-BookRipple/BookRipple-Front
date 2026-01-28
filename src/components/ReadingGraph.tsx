import ReadingGraphItem from "./ReadingGraphItem";

interface ReadingDayData {
    dayLabel: string;
    percent: number;
}

interface ReadingGraphProps {
    ReadingTotalTime: number;
    weeklyData: ReadingDayData[];
}

const ReadingGraph = ({ ReadingTotalTime, weeklyData }: ReadingGraphProps) => {
    return (
        <div className="w-full max-w-[370px] min-h-[232px] flex flex-col items-center justify-center bg-[#FFF] rounded-[20px] py-[14px] gap-[10px]">
            <div className="font-weight-[500] font-[Freesentation] text-[18px] text-[#58534E]">
                총 {ReadingTotalTime}시간 독서했어요!
            </div>

            <div className="flex flex-row items-center justify-center gap-[5px] w-full max-w-[320px] h-[163px] px-[25px] py-[5px]">
                {weeklyData.map(({ dayLabel, percent }) => (
                    <ReadingGraphItem
                        key={dayLabel}
                        dayLabel={dayLabel}
                        percent={percent}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReadingGraph;
