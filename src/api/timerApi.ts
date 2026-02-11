import { http } from '../types/http';

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/** reading/start (시작/재개) */
export const startReading = (bookId: number) => {
  return http.post<ApiResponse<{ sessionId: number }>>(
    '/api/v1/reading/start',
    { bookId },
  );
};

/** reading/{session-id}/pause (일시정지) */
export type ReadingSessionStatus = 'READING' | 'PAUSED' | 'ENDED' | string;

export const pauseReading = (sessionId: number) => {
  return http.post<
    ApiResponse<{
      sessionId: number;
      accumulatedTime: number;
      status: ReadingSessionStatus;
    }>
  >(`/api/v1/reading/${sessionId}/pause`);
};

/** reading/end (종료 + 쪽수 기록) */
export const endReading = (params: {
  sessionId: number;
  pagesReadStart: number;
  pagesReadEnd: number;
}) => {
  return http.post<
    ApiResponse<{
      recordId: number;
      readingTime: number;
      totalReadingTime: number;
      progress: number;
      completed: boolean;
    }>
  >('/api/v1/reading/end', params);
};

/** reading/complete (완독 처리) */
export const completeReading = (bookId: number) => {
  return http.post<
    ApiResponse<{
      bookId: number;
      progress: number;
      completed: boolean;
    }>
  >('/api/v1/reading/complete', { bookId });
};
