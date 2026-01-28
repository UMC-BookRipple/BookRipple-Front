export type BookshelfTabKey = 'reading' | 'finished' | 'liked';

export type BookItem = {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  pages?: number;

  coverUrl: string;
  isLiked: boolean;

  status: 'reading' | 'finished' | 'liked';

  progressPercent?: number;
  currentPage?: number;
};
