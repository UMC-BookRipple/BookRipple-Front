import { create } from 'zustand';

import {
  createMemo as apiCreateMemo,
  deleteMemo as apiDeleteMemo,
  fetchMyBookMemoList,
  updateMemo as apiUpdateMemo,
  type MemoListResult,
  type MemoUpsertReq,
} from '../api/memoApi';

export type MemoItem = {
  memoId: number;
  writerName: string;
  memoTitle: string;
  context: string;
  page: string;
};

type LoadState = {
  isLoading: boolean;
  error: string | null;
};

interface MemoState extends LoadState {
  bookTitle: string;
  memos: MemoItem[];

  currentBookId: number | null;

  setCurrentBookId: (bookId: number) => void;
  setBookTitle: (title: string) => void;

  loadMemos: (bookId?: number) => Promise<void>;

  addMemo: (
    payload: { memoTitle: string; context: string; page: string },
    bookId?: number,
  ) => Promise<void>;

  editMemo: (
    memoId: number,
    payload: { memoTitle: string; context: string; page: string },
  ) => Promise<void>;

  removeMemo: (memoId: number) => Promise<void>;
  removeMemos: (memoIds: number[]) => Promise<void>;
}

function ensureBookId(
  bookId: number | undefined,
  currentBookId: number | null,
) {
  const id = bookId ?? currentBookId;
  if (!id || Number.isNaN(id))
    throw new Error('bookId가 없습니다. 라우팅/상태를 확인하세요.');
  return id;
}

function mapListResult(result: MemoListResult): MemoItem[] {
  return result.items.map((it) => ({
    memoId: it.memoId,
    writerName: it.writerName,
    memoTitle: it.memoTitle,
    context: it.context,
    page: it.page,
  }));
}

function toUpsertReq(payload: {
  memoTitle: string;
  context: string;
  page: string;
}): MemoUpsertReq {
  return {
    contentReq: { content: payload.context },
    memoTitle: payload.memoTitle,
    page: payload.page,
  };
}

const useMemoStore = create<MemoState>((set, get) => ({
  bookTitle: '',
  memos: [],
  currentBookId: null,
  isLoading: false,
  error: null,

  setCurrentBookId: (bookId) => set({ currentBookId: bookId }),
  setBookTitle: (title) => set({ bookTitle: title }),

  loadMemos: async (bookId) => {
    set({ isLoading: true, error: null });
    try {
      const id = ensureBookId(bookId, get().currentBookId);

      const res = await fetchMyBookMemoList(id);
      if (!res.isSuccess) throw new Error(res.message || '메모 목록 조회 실패');

      set({
        memos: mapListResult(res.result),
        currentBookId: id,
      });
    } catch (e: any) {
      set({ error: e?.message ?? '메모 목록 조회 실패' });
    } finally {
      set({ isLoading: false });
    }
  },

  addMemo: async ({ memoTitle, context, page }, bookId) => {
    const nextTitle = memoTitle.trim();
    const nextContext = context.trim();
    const nextPage = page.trim();
    if (!nextTitle || !nextContext || !nextPage) return;

    set({ error: null });
    try {
      const id = ensureBookId(bookId, get().currentBookId);

      const res = await apiCreateMemo(
        id,
        toUpsertReq({
          memoTitle: nextTitle,
          context: nextContext,
          page: nextPage,
        }),
      );
      if (!res.isSuccess) throw new Error(res.message || '메모 생성 실패');

      await get().loadMemos(id);
    } catch (e: any) {
      set({ error: e?.message ?? '메모 생성 실패' });
      throw e;
    }
  },

  editMemo: async (memoId, { memoTitle, context, page }) => {
    const nextTitle = memoTitle.trim();
    const nextContext = context.trim();
    const nextPage = page.trim();
    if (!nextTitle || !nextContext || !nextPage) return;

    set({ error: null });
    try {
      const res = await apiUpdateMemo(
        memoId,
        toUpsertReq({
          memoTitle: nextTitle,
          context: nextContext,
          page: nextPage,
        }),
      );
      if (!res.isSuccess) throw new Error(res.message || '메모 수정 실패');

      set((state) => ({
        memos: state.memos.map((m) =>
          m.memoId === memoId
            ? {
                ...m,
                memoTitle: nextTitle,
                context: nextContext,
                page: nextPage,
              }
            : m,
        ),
      }));
    } catch (e: any) {
      set({ error: e?.message ?? '메모 수정 실패' });
      throw e;
    }
  },

  removeMemo: async (memoId) => {
    set({ error: null });
    try {
      const res = await apiDeleteMemo(memoId);
      if (!res.isSuccess) throw new Error(res.message || '메모 삭제 실패');

      set((state) => ({
        memos: state.memos.filter((m) => m.memoId !== memoId),
      }));
    } catch (e: any) {
      set({ error: e?.message ?? '메모 삭제 실패' });
      throw e;
    }
  },

  removeMemos: async (memoIds) => {
    if (memoIds.length === 0) return;
    set({ error: null });

    await Promise.all(memoIds.map((id) => get().removeMemo(id)));
  },
}));

export default useMemoStore;
