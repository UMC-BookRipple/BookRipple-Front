import { create } from "zustand";

interface ModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;

    title?: string;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),

    title: "삭제하시겠습니까?"
})
);

