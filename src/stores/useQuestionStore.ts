import { create } from 'zustand';

export interface QuestionItem {
  id: string;
  question: string;
  createdAt: string;
}

export interface QuestionState {
  questions: QuestionItem[];
  addQuestion: (question: string) => void;
  removeQuestions: (ids: string[]) => void;
}

const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  addQuestion: (question) =>
    set((state) => ({
      questions: [
        {
          id: crypto.randomUUID(),
          question,
          createdAt: new Date().toISOString(),
        },
        ...state.questions,
      ],
    })),
  removeQuestions: (ids) =>
    set((state) => ({
      questions: state.questions.filter((item) => !ids.includes(item.id)),
    })),
}));

export default useQuestionStore;
