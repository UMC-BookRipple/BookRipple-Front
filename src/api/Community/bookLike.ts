import { http } from "../../types/http";

interface LikeBookResult {
  bookId: number;
  liked: boolean;
}

export const toggleLikeBook = async (bookId: number): Promise<LikeBookResult> => {
  const res = await http.post(`/api/v1/books/likes/${bookId}`);

  if (!res.data?.isSuccess || !res.data.result) {
    throw new Error("좋아요 처리 실패");
  }

  return res.data.result;
};

// 좋아요 취소 API 함수
export const cancelLikeBook = async (bookId: number): Promise<LikeBookResult> => {
  try {
    const res = await http.delete(`/api/v1/books/likes/${bookId}`); // DELETE 요청으로 취소 처리

    if (res.data.isSuccess) {
      return res.data.result; // liked: false로 변경
    } else {
      throw new Error(res.data.message || '좋아요 취소 실패');
    }
  } catch (error) {
    console.error("좋아요 취소 실패:", error);
    throw error;
  }
};
