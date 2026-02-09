import { create } from 'zustand';
import {
  getLibraryBookDetail,
  type LibraryBookDetail,
  type ApiResponse,
} from '../api/libraryApi';

type LoadState = {
  isLoadingById: Record<number, boolean | undefined>;
  errorById: Record<number, string | undefined>;
};

interface BookStoreState extends LoadState {
  detailsById: Record<number, LibraryBookDetail | undefined>;

  fetchBookDetail: (
    bookId: number,
    options?: { force?: boolean },
  ) => Promise<void>;
  getBookTitle: (bookId: number) => string | undefined;
  getBookDetail: (bookId: number) => LibraryBookDetail | undefined;
  clearBookDetail: (bookId: number) => void;
}

export const useBookStore = create<BookStoreState>((set, get) => ({
  detailsById: {},
  isLoadingById: {},
  errorById: {},

  fetchBookDetail: async (bookId, options) => {
    if (!bookId || Number.isNaN(bookId)) return;

    const cached = get().detailsById[bookId];
    if (cached && !options?.force) return;

    set((s) => ({
      isLoadingById: { ...s.isLoadingById, [bookId]: true },
      errorById: { ...s.errorById, [bookId]: undefined },
    }));

    try {
      const res = await getLibraryBookDetail(bookId);
      const data: ApiResponse<LibraryBookDetail> = res.data;

      if (!data.isSuccess) throw new Error(data.message || '책 상세 조회 실패');

      set((s) => ({
        detailsById: { ...s.detailsById, [bookId]: data.result },
      }));
    } catch (e: any) {
      set((s) => ({
        errorById: {
          ...s.errorById,
          [bookId]: e?.message ?? '책 상세 조회 실패',
        },
      }));
    } finally {
      set((s) => ({
        isLoadingById: { ...s.isLoadingById, [bookId]: false },
      }));
    }
  },

  getBookTitle: (bookId) => get().detailsById[bookId]?.title,

  getBookDetail: (bookId) => get().detailsById[bookId],

  clearBookDetail: (bookId) => {
    set((s) => {
      const next = { ...s.detailsById };
      delete next[bookId];
      return { detailsById: next };
    });
  },
}));
