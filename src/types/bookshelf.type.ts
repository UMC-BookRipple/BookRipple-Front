export type BookshelfTabKey = 'reading' | 'finished' | 'liked';

// API에서 사용하는 status 타입
export type BookStatus = 'READING' | 'COMPLETED' | 'LIKED';

// 탭 키를 API status로 변환
export const tabToStatus: Record<BookshelfTabKey, BookStatus> = {
  reading: 'READING',
  finished: 'COMPLETED',
  liked: 'LIKED',
};

// API status를 탭 키로 변환
export const statusToTab: Record<BookStatus, BookshelfTabKey> = {
  READING: 'reading',
  COMPLETED: 'finished',
  LIKED: 'liked',
};

export type BookItem = {
  id: string;
  title: string;
  author?: string;
  authors?: string[]; // API response에서 authors 배열로 옴
  publisher?: string;
  pages?: number;

  coverUrl: string;
  isLiked: boolean;

  status: 'reading' | 'finished' | 'liked';

  progressPercent?: number;
  currentPage?: number;

  // API 응답 필드
  libraryItemId?: number;
  bookId?: number;
};

// API 응답 타입
export interface ApiBookItem {
  libraryItemId: number;
  aladinItemId: number;
  bookId: number;
  title: string;
  coverUrl: string;
  authors: string[];
  status: BookStatus;
  isLiked: boolean;
}

export interface BookshelfApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    items: ApiBookItem[];
    hasNext: boolean;
    lastId: number;
  };
}

// 책 상세 조회 API 응답 타입
export interface BookDetailApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    bookId: number;
    title: string;
    coverUrl: string;
    authors: string[];
    publisher: string;
    totalPages: number;
    status: BookStatus;
    progressPercent: number;
    isLiked: boolean;
  };
}
