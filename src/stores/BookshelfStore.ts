import { create } from 'zustand';
import type {
  BookItem,
  BookshelfTabKey,
  BookStatus,
} from '../types/bookshelf.type';
import { tabToStatus } from '../types/bookshelf.type';
import { fetchBooksByStatus, deleteLibraryBooks } from '../api/bookshelf.api';
import { convertApiBookToBookItem } from '../utils/bookshelf.utils';

interface BookshelfState {
  books: BookItem[];
  isLoading: boolean;
  error: string | null;
  hasNext: boolean;
  lastId: number | null;

  /*
   탭별 도서 목록 조회 (READING/FINISHED/LIKED)
   API에서 'isLiked' 필드를 제공하지 않는 문제를 해결하기 위해, 좋아요한 책 목록을 별도로 조회하여 병합함
   */
  fetchBooksByTab: (tab: BookshelfTabKey) => Promise<void>;

  /* 스토어 내에서 좋아요 상태를 낙관적(optimistic)으로 토글 */
  toggleLike: (bookId: string) => void;

  /*
   ID 목록으로 도서 삭제
   API 호출 전 libraryItemId를 bookId로 변환하여 전송
   */
  deleteBooks: (bookIds: string[], status: BookStatus) => Promise<void>;

  /* libraryItemId로 도서 조회 */
  getBookById: (bookId: string) => BookItem | undefined;
}

export const useBookshelfStore = create<BookshelfState>((set, get) => ({
  books: [],
  isLoading: false,
  error: null,
  hasNext: false,
  lastId: null,

  fetchBooksByTab: async (tab: BookshelfTabKey) => {
    set({ isLoading: true, error: null });

    try {
      const status = tabToStatus[tab];

      // 현재 탭의 책들 가져오기
      const response = await fetchBooksByStatus({ status });

      // 좋아요한 책들의 bookId 목록 가져오기 (isLiked 상태 확인용)
      let likedBookIds = new Set<number>();
      try {
        const likedResponse = await fetchBooksByStatus({
          status: 'LIKED',
          size: 100,
        });
        likedBookIds = new Set(
          likedResponse.result.items.map((item) => item.bookId),
        );
      } catch (error) {
        console.warn(
          '⚠️ Failed to fetch liked books, isLiked will be false for all books',
        );
      }

      // bookId를 기준으로 isLiked 설정
      const books = response.result.items.map((apiBook) => {
        const bookItem = convertApiBookToBookItem(apiBook);
        // API에 isLiked가 없으므로, 좋아요한 책 목록에서 확인
        bookItem.isLiked = apiBook.bookId
          ? likedBookIds.has(apiBook.bookId)
          : false;
        return bookItem;
      });

      set({
        books,
        hasNext: response.result.hasNext,
        lastId: response.result.lastId,
        isLoading: false,
      });
    } catch (error) {
      console.error('❌ Error in fetchBooksByTab:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch books',
        isLoading: false,
      });
    }
  },

  toggleLike: (bookId: string) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId ? { ...book, isLiked: !book.isLiked } : book,
      ),
    }));
  },

  deleteBooks: async (bookIds: string[], status: BookStatus) => {
    try {
      const currentBooks = get().books;
      const targetBookIds: number[] = [];

      for (const id of bookIds) {
        const book = currentBooks.find((b) => b.id === id);
        if (book && book.bookId) {
          targetBookIds.push(book.bookId);
        }
      }

      if (targetBookIds.length === 0) {
        return;
      }

      await deleteLibraryBooks(targetBookIds, status);

      set((state) => ({
        books: state.books.filter((book) => !bookIds.includes(book.id)),
      }));
    } catch (error) {
      console.error('❌ Failed to delete books:', error);
      throw error;
    }
  },

  getBookById: (bookId: string) => {
    return get().books.find((book) => book.id === bookId);
  },
}));
