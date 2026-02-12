import { useEffect, useState } from 'react';
import Divider from '../../components/Divider';
import MenuBarItems from '../../components/MenuBarItems';
import Header from '../../components/Header';
import ReadingGraph from '../../components/ReadingGraph';
import ReadingInformList from '../../components/ReadingInformList';
import ReadingSpeedList from '../../components/ReadingSpeedList';
import { getWeeklyReadingGraph } from '../../api/readingGraphApi';
import { getBooksSummary, type LibraryBookSummary } from '../../api/libraryApi';

const DAY_OF_WEEK_MAP: Record<string, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const ReadingRecordPage = () => {
  const [weeklyData, setWeeklyData] = useState<
    { dayLabel: string; percent: number }[]
  >([]);
  const [totalReadingTime, setTotalReadingTime] = useState(0);
  const [books, setBooks] = useState<LibraryBookSummary[]>([]);

  useEffect(() => {
    const fetchWeeklyGraph = async () => {
      try {
        const { data } = await getWeeklyReadingGraph();
        if (data.isSuccess) {
          const { dailyReadingList, totalReadingTime } = data.result;
          const maxMinutes = Math.max(
            ...dailyReadingList.map((d) => d.readingTimeMinutes),
            1,
          );

          setWeeklyData(
            dailyReadingList.map((d) => ({
              dayLabel: DAY_OF_WEEK_MAP[d.dayOfWeek] ?? d.dayOfWeek,
              percent: Math.round((d.readingTimeMinutes / maxMinutes) * 100),
            })),
          );
          setTotalReadingTime(Math.round(totalReadingTime / 60));
        }
      } catch (e) {
        console.error('주별 독서 그래프 조회 실패', e);
      }
    };

    const fetchBooksSummary = async () => {
      try {
        const { data } = await getBooksSummary();
        if (data.isSuccess) {
          setBooks(data.result.books);
        }
      } catch (e) {
        console.error('도서 요약 조회 실패', e);
      }
    };

    fetchWeeklyGraph();
    fetchBooksSummary();
  }, []);
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
      <Header />

      {/* MyPageLabel */}
      <div className="flex w-full items-center px-[14px] pt-[30px]">
        <span className="flex h-[50px] items-center gap-[10px] px-[5px] py-[12px] font-[GmarketSansBold] text-[20px] whitespace-nowrap text-[#58534E]">
          MY PAGE
        </span>
      </div>

      <div className="flex w-full flex-col px-[14px] py-[6px]">
        <Divider />
        <MenuBarItems mainLabel="내 기록 확인" MenuBarLabel="도서 기록" />
        <Divider />
      </div>

      <div className="font-weight-[500] flex w-full flex-col items-start px-[20px] pt-[20px] pb-[10px] font-[Freesentation] text-[18px] text-[#58534E]">
        <p>주별 독서 그래프</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[10px] px-[16px] py-[10px]">
        <Divider />
        <ReadingGraph
          ReadingTotalTime={totalReadingTime}
          weeklyData={weeklyData}
        />
      </div>

      <div className="font-weight-[500] flex w-full flex-col items-start px-[20px] pt-[20px] pb-[10px] font-[Freesentation] text-[18px] text-[#58534E]">
        <p> 도서별 독서 시간/독서율</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[15px] px-[16px] pt-[10px]">
        <Divider />
        <ReadingInformList books={books} />
      </div>

      <div className="font-weight-[500] flex w-full flex-col items-start px-[20px] pt-[20px] pb-[10px] font-[Freesentation] text-[18px] text-[#58534E]">
        <p>독서 진행 속도</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[15px] px-[16px] pt-[10px] pb-[30px]">
        <Divider />
        <ReadingSpeedList books={books} />
      </div>
      <div className="h-[20px]" />
    </div>
  );
};

export default ReadingRecordPage;
