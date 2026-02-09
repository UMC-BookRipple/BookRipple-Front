import { useEffect } from 'react';
import { useBookStore } from '../stores/useBookStore';

export function useBookTitle(bookId?: number) {
  const { fetchBookDetail, getBookTitle } = useBookStore();

  useEffect(() => {
    if (!bookId || Number.isNaN(bookId)) return;
    fetchBookDetail(bookId);
  }, [bookId, fetchBookDetail]);

  return getBookTitle(bookId ?? NaN) || '책 제목';
}
