import { create } from 'zustand';

type ModalStoreState = {
  isOpen: boolean;
  title: string;

  confirmAction: null | (() => void);

  open: (title: string, confirmAction?: () => void) => void;
  close: () => void;
};

export const useModalStore = create<ModalStoreState>((set) => ({
  isOpen: false,
  title: '',

  confirmAction: null,

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
      confirmAction: null,
    }),
}));
