import { create } from "zustand";

interface SignupState {
  signupData: {
    name: string;
    loginId: string;
    password: string;
    email: string;
    birthDate: string;
    isRequiredAgreed: boolean;
    isOptionalAgreed: boolean;
  };
  setSignupData: (data: Partial<SignupState["signupData"]>) => void;
  resetSignupData: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  signupData: {
    name: "",
    loginId: "",
    password: "",
    email: "",
    birthDate: "",
    isRequiredAgreed: false,
    isOptionalAgreed: false,
  },

  setSignupData: (data) =>
    set((state) => ({
      signupData: { ...state.signupData, ...data },
    })),

  resetSignupData: () =>
    set({
      signupData: {
        name: "",
        loginId: "",
        password: "",
        email: "",
        birthDate: "",
        isRequiredAgreed: false,
        isOptionalAgreed: false,
      },
    }),
}));
