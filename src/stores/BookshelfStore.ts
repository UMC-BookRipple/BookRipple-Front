import { create } from 'zustand';
import type { BookItem } from '../pages/bookshelf/_types/bookshelf.type';
import { BOOKSHELF_MOCK } from '../pages/bookshelf/_mocks/bookshelf.mock';

interface BookshelfState {
  books: BookItem[];
  toggleLike: (bookId: string) => void;
  deleteBooks: (bookIds: string[]) => void;
  getBookById: (bookId: string) => BookItem | undefined;
}

export const useBookshelfStore = create<BookshelfState>((set, get) => ({
  books: BOOKSHELF_MOCK,

  toggleLike: (bookId: string) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId ? { ...book, isLiked: !book.isLiked } : book,
      ),
    }));
  },

  deleteBooks: (bookIds: string[]) => {
    set((state) => ({
      books: state.books.filter((book) => !bookIds.includes(book.id)),
    }));
  },

  getBookById: (bookId: string) => {
    return get().books.find((book) => book.id === bookId);
  },
}));
