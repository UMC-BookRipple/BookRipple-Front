import type { BookItem, BookshelfTabKey } from '../_types/bookshelf.type';

export function isBookshelfTabKey(v: string): v is BookshelfTabKey {
  return v === 'reading' || v === 'finished' || v === 'liked';
}

export function filterByTab(books: BookItem[], tab: BookshelfTabKey) {
  if (tab === 'liked') return books.filter((b) => b.isLiked);
  if (tab === 'finished') return books.filter((b) => b.status === 'finished');
  return books.filter((b) => b.status === 'reading');
}
