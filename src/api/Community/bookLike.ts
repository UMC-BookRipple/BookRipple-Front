import api from "../axios";

interface LikeBookResult {
  bookId: number;
  liked: boolean;
}

export const toggleLikeBook = async (bookId: number): Promise<LikeBookResult> => {
  const res = await api.post(`/v1/books/likes/${bookId}`);

  if (!res.data?.isSuccess || !res.data.result) {
    throw new Error("좋아요 처리 실패");
  }

  return res.data.result;
};
