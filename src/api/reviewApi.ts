import { http } from '../types/http';

export type CreateReviewRequest = {
  content: string;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type CreateReviewResult = {
  id: number;
};

// 감상평 생성
export const createReview = async (
  bookId: number | string,
  payload: CreateReviewRequest,
) => {
  const { data } = await http.post<ApiResponse<CreateReviewResult>>(
    `/api/v1/books/${bookId}/reviews`,
    payload,
  );
  return data;
};
