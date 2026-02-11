import { create } from "zustand";

interface ChangeState {
    changeData: {
        loginId: string;
        password: string;
        email: string;
    };
    setChangeData: (data: Partial<ChangeState["changeData"]>) => void;
    resetChangeData: () => void;
}

export const useChangeStore = create<ChangeState>((set) => ({
    changeData: {
        loginId: "",
        password: "",
        email: "",
    },

    setChangeData: (data) =>
        set((state) => ({
            changeData: { ...state.changeData, ...data },
        })),

    resetChangeData: () =>
        set({
            changeData: {
                loginId: "",
                password: "",
                email: "",
            },
        }),
}));
