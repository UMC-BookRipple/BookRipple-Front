import { create } from 'zustand';

type ModalStoreState = {
  isOpen: boolean;
  title: string;

  // ✅ CHANGED: 확인 버튼 눌렀을 때 실행할 콜백 저장
  confirmAction: null | (() => void);

  open: (title: string, confirmAction?: () => void) => void; // ✅ CHANGED
  close: () => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  isOpen: false,
  title: '',

  // ✅ CHANGED
  confirmAction: null,

  // ✅ CHANGED: confirmAction을 optional로 받음
  open: (title, confirmAction) =>
    set({
      isOpen: true,
      title,
      confirmAction: confirmAction ?? null,
    }),

  close: () =>
    set({
      isOpen: false,
      title: '',
      confirmAction: null, // ✅ CHANGED: 닫을 때 콜백도 초기화
    }),
}));
