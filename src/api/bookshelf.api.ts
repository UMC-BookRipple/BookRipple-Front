import type {
  BookshelfApiResponse,
  BookStatus,
  BookDetailApiResponse,
} from '../types/bookshelf.type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

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
  const params = new URLSearchParams({
    status,
    size: size.toString(),
  });

  if (lastId !== undefined) {
    params.append('lastId', lastId.toString());
  }

  const url = `${BASE_URL}/api/v1/library/books?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }

    const data = await response.json();

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
  const url = `${BASE_URL}/api/v1/library/books/${bookId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch book detail: ${response.statusText}`);
    }

    const data = await response.json();

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
  const url = `${BASE_URL}/api/v1/books/likes/${bookId}`;
  const method = isLiked ? 'DELETE' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle like: ${response.statusText}`);
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
  const url = `${BASE_URL}/api/v1/library/books/delete?status=${status}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ bookIds: libraryItemIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete books: ${response.statusText}`);
    }
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
    const url = `${BASE_URL}/api/v1/books/aladin/${aladinItemId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch/register book: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.isSuccess || !data.result) {
      throw new Error(data.message || 'Failed to fetch/register book');
    }

    const { bookId } = data.result;

    // 2. 독서 시작(reading/start) API 호출하여 내 책장(읽고 있는 책)에 추가
    const readingUrl = `${BASE_URL}/api/v1/reading/start`;
    const readingResponse = await fetch(readingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        bookId: bookId,
      }),
    });

    if (!readingResponse.ok) {
      throw new Error(`Failed to start reading: ${readingResponse.statusText}`);
    }

    const readingData = await readingResponse.json();

    if (!readingData.isSuccess) {
      throw new Error(readingData.message || 'Failed to start reading');
    }

    return bookId;
  } catch (error) {
    console.error('❌ Add book to bookshelf error:', error);
    throw error;
  }
};
