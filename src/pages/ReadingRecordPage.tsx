import Divider from "../components/Divider";
import MenuBarItems from "../components/MenuBarItems";
import Header from "../components/Header";
import ReadingGraph from "../components/ReadingGraph";
import ReadingInformList from "../components/ReadingInformList";
import ReadingSpeedList from "../components/ReadingSpeedList";

const ReadingRecordPage = () => {

    const weeklyData = [
        { dayLabel: "월", percent: 50 },
        { dayLabel: "화", percent: 60 },
        { dayLabel: "수", percent: 70 },
        { dayLabel: "목", percent: 80 },
        { dayLabel: "금", percent: 90 },
        { dayLabel: "토", percent: 100 },
        { dayLabel: "일", percent: 100 },
    ];
    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <Header />

            {/* MyPageLabel */}
            <div
                className="w-full flex items-center px-[14px] pt-[30px]">
                <span
                    className="h-[50px] py-[12px] px-[5px] gap-[10px] flex items-center whitespace-nowrap font-[GmarketSansBold] text-[20px] text-[#58534E]">
                    MY PAGE</span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">

                <Divider />
                <div className="w-full flex justify-center">
                    <MenuBarItems mainLabel="내 기록 확인" MenuBarLabel="도서 기록" />
                </div>

                <Divider />
            </div>

            <div className="w-full flex flex-col items-start px-[20px] pt-[20px] pb-[10px] font-[Freesentation] text-[18px] font-weight-[500] text-[#58534E]">
                <p>주별 독서 그래프</p>
            </div>


            <div className="w-full flex flex-col items-center justify-center py-[10px] px-[16px] gap-[10px]">
                <Divider />
                <ReadingGraph ReadingTotalTime={100} weeklyData={weeklyData} />
            </div>

            <div className="w-full flex flex-col items-start px-[20px] pt-[20px] pb-[10px] font-[Freesentation] text-[18px] font-weight-[500] text-[#58534E]">
                <p> 도서별 독서 시간/독서율</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[10px] px-[16px] gap-[15px]">
                <Divider />
                <ReadingInformList />
            </div>

            <div className="w-full flex flex-col items-start px-[20px] pt-[20px] pb-[10px] font-[Freesentation] text-[18px] font-weight-[500] text-[#58534E]">
                <p>독서 진행 속도</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-[10px] px-[16px] gap-[15px] pb-[30px]">
                <Divider />
                <ReadingSpeedList />
            </div>
            <div className="h-[20px]" />
        </div>
    );
};

export default ReadingRecordPage;