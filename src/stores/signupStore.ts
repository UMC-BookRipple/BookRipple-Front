import { create } from 'zustand';
import type { SignupReq } from '../types/api';

interface SignupState {
    signupData: SignupReq;
    setSignupData: (data: Partial<SignupReq>) => void;
    resetSignupData: () => void;
}

const initialData: SignupReq = {
    name: '',
    loginId: '',
    password: '',
    email: '',
    birthDate: '',
    isTermsAgreedRequired: true,
    isTermsAgreedOptional: false,
};

export const useSignupStore = create<SignupState>((set) => ({
    signupData: initialData,
    setSignupData: (data) =>
        set((state) => ({
            signupData: { ...state.signupData, ...data }
        })),
    resetSignupData: () => set({ signupData: initialData }),
}));
