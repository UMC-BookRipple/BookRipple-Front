import type {
  BookItem,
  BookshelfTabKey,
  ApiBookItem,
} from '../types/bookshelf.type';
import { statusToTab as statusToTabMap } from '../types/bookshelf.type';

export function isBookshelfTabKey(v: string): v is BookshelfTabKey {
  return v === 'reading' || v === 'finished' || v === 'liked';
}

export function filterByTab(books: BookItem[], tab: BookshelfTabKey) {
  if (tab === 'liked') return books.filter((b) => b.isLiked);
  if (tab === 'finished') return books.filter((b) => b.status === 'finished');
  return books.filter((b) => b.status === 'reading');
}

// API 응답을 BookItem으로 변환
export function convertApiBookToBookItem(apiBook: ApiBookItem): BookItem {
  const status = statusToTabMap[apiBook.status];

  return {
    id: apiBook.libraryItemId.toString(),
    title: apiBook.title,
    coverUrl: apiBook.coverUrl,
    authors: apiBook.authors,
    author: apiBook.authors[0], // 첫 번째 작가를 author로 설정
    isLiked: apiBook.isLiked ?? false, // API 응답의 isLiked 필드 사용, undefined면 false
    status,
    libraryItemId: apiBook.libraryItemId,
    bookId: apiBook.bookId,
  };
}
