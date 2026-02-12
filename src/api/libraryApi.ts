import { http } from '../types/http';

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export type LibraryBookDetail = {
  bookId: number;
  title: string; // 책 제목
  coverUrl: string;
  authors: string[];
  publisher: string;
  totalPages: number;
  status: string;
  progressPercent: number; // 진행률
};

export const getLibraryBookDetail = (bookId: number) => {
  return http.get<ApiResponse<LibraryBookDetail>>(
    `/api/v1/library/books/${bookId}`,
  );
};

export type LibraryBookSummary = {
  bookId: number;
  coverUrl: string;
  title: string;
  authors: string[];
  status: 'LIKED' | 'READING' | 'COMPLETED';
  progressPercent: number;
  readingTimeMinutes: number;
  estimatedDaysToCompletion: number | null;
};

export type LibraryBookSummaryListRes = {
  books: LibraryBookSummary[];
  totalCount: number;
};

/** 마이페이지 읽고 있는 책 요약 조회 */
export const getBooksSummary = () => {
  return http.get<ApiResponse<LibraryBookSummaryListRes>>(
    '/api/v1/library/books-summary',
  );
};
