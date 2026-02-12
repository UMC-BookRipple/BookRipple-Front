import { http } from '../types/http';
import type { ApiResponse } from '../types/api';

export interface DailyReading {
  date: string;
  dayOfWeek: string;
  readingTimeMinutes: number;
}

export interface WeeklyReadingGraphResult {
  dailyReadingList: DailyReading[];
  totalReadingTime: number;
}

/** 주별 독서 그래프 조회 */
export const getWeeklyReadingGraph = () => {
  return http.get<ApiResponse<WeeklyReadingGraphResult>>(
    '/api/v1/reading/graph/weekly',
  );
};
