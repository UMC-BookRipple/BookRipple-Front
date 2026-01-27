import { create } from 'zustand';

export interface MemoItem {
  id: string;
  content: string;
  createdAt: string;
}

interface MemoState {
  memos: MemoItem[];
  addMemo: (content: string) => void;
  updateMemo: (id: string, content: string) => void;
  removeMemo: (id: string) => void;
  removeMemos: (ids: string[]) => void;
}

const useMemoStore = create<MemoState>((set) => ({
  memos: [],
  addMemo: (content) =>
    set((state) => ({
      memos: [
        {
          id: crypto.randomUUID(),
          content,
          createdAt: new Date().toISOString(),
        },
        ...state.memos,
      ],
    })),
  updateMemo: (id, content) =>
    set((state) => ({
      memos: state.memos.map((memo) =>
        memo.id === id ? { ...memo, content } : memo,
      ),
    })),
  removeMemo: (id) =>
    set((state) => ({ memos: state.memos.filter((memo) => memo.id !== id) })),
  removeMemos: (ids) =>
    set((state) => ({
      memos: state.memos.filter((memo) => !ids.includes(memo.id)),
    })),
}));

export default useMemoStore;
