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
