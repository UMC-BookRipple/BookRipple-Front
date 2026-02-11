import type {
  BookshelfApiResponse,
  BookStatus,
  BookDetailApiResponse,
} from '../types/bookshelf.type';
import { http } from '../types/http';

/* 책장 아이템 조회 파라미터 */
export interface FetchBooksParams {
  status: BookStatus;
  lastId?: number;
  size?: number;
}

/*
 상태별 내 책장 도서 목록 조회
 @param params - { status: 도서 상태, lastId: 마지막 도서 ID (커서 기반 페이징), size: 조회 개수 }
 @returns Promise<BookshelfApiResponse>
 */
export const fetchBooksByStatus = async ({
  status,
  lastId,
  size = 20,
}: FetchBooksParams): Promise<BookshelfApiResponse> => {
  const params: any = {
    status,
    size,
  };

  if (lastId !== undefined) {
    params.lastId = lastId;
  }

  try {
    const response = await http.get('/api/v1/library/books', { params });
    const data = response.data;

    if (!data.isSuccess) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
};

/*
 특정 도서 상세 정보 조회
 @param bookId - 조회할 도서 ID
 @returns Promise<BookDetailApiResponse>
 */
export const fetchBookDetail = async (
  bookId: number,
): Promise<BookDetailApiResponse> => {
  try {
    const response = await http.get(`/api/v1/library/books/${bookId}`);
    const data = response.data;

    if (!data.isSuccess) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('❌ Fetch book detail error:', error);
    throw error;
  }
};

/*
 도서 좋아요 상태 토글 (추가/삭제)
 @param bookId - 좋아요/좋아요 취소할 도서 ID
 @param isLiked - 현재 좋아요 상태 (true면 삭제, false면 추가)
 */
export const toggleBookLike = async (
  bookId: number,
  isLiked: boolean,
): Promise<void> => {
  try {
    if (isLiked) {
      await http.delete(`/api/v1/books/likes/${bookId}`);
    } else {
      await http.post(`/api/v1/books/likes/${bookId}`);
    }
  } catch (error) {
    console.error('❌ Toggle like error:', error);
    throw error;
  }
};

/*
 내 책장 도서 삭제
 @param libraryItemIds - 삭제할 서재 아이템 ID 목록 (API 요청 시 bookId로 변환되어야 함)
 @param status - 도서의 논리적 상태 (READING/LIKED/COMPLETED)
 */
export const deleteLibraryBooks = async (
  libraryItemIds: number[],
  status: BookStatus,
): Promise<void> => {
  try {
    await http.post(`/api/v1/library/books/delete?status=${status}`, {
      bookIds: libraryItemIds,
    });
  } catch (error) {
    console.error('❌ Delete books error:', error);
    throw error;
  }
};

/**
 * 책장에 책 추가 (진행 중 상태로)
 * aladinItemId로 책을 조회하거나 생성하여 책장에 추가
 * @param aladinItemId - 알라딘 아이템 ID
 * @returns Promise<number> - 추가된 책의 bookId
 */
export const addBookToBookshelf = async (
  aladinItemId: number,
): Promise<number> => {
  try {
    // 1. 알라딘 도서 정보를 DB에 등록/조회하여 bookId 획득
    const response = await http.get(`/api/v1/books/aladin/${aladinItemId}`);
    const data = response.data;

    if (!data.isSuccess || !data.result) {
      throw new Error(data.message || 'Failed to fetch/register book');
    }

    const { bookId } = data.result;

    // 2. 독서 시작(reading/start) API 호출하여 내 책장(읽고 있는 책)에 추가
    const readingResponse = await http.post('/api/v1/reading/start', {
      bookId: bookId,
    });
    const readingData = readingResponse.data;

    if (!readingData.isSuccess) {
      throw new Error(readingData.message || 'Failed to start reading');
    }

    return bookId;
  } catch (error) {
    console.error('❌ Add book to bookshelf error:', error);
    throw error;
  }
};
