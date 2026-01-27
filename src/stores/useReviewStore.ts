import { create } from 'zustand';

export interface ReviewItem {
  id: string;
  content: string;
  createdAt: string;
}

interface ReviewState {
  reviews: ReviewItem[];
  addReview: (content: string) => void;
}

const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  addReview: (content) =>
    set((state) => ({
      reviews: [
        {
          id: crypto.randomUUID(),
          content,
          createdAt: new Date().toISOString(),
        },
        ...state.reviews,
      ],
    })),
}));

export default useReviewStore;
