import type { BookItem } from '../_types/bookshelf.type';
import BookCard from './BookCard';

type Props = {
  books: BookItem[];
  isEditMode: boolean;
  selectedIds: Set<string>;
  onClickBook: (id: string) => void;
  onToggleLike: (id: string) => void;
};

export default function BookGrid({
  books,
  isEditMode,
  selectedIds,
  onClickBook,
  onToggleLike,
}: Props) {
  // 3개씩 묶어서 렌더링
  const rows = [];
  for (let i = 0; i < books.length; i += 3) {
    rows.push(books.slice(i, i + 3));
  }

  return (
    <div className="mx-auto w-full max-w-[420px] bg-[#F7F5F1] pb-[70px]">
      <div className="flex flex-col">
        {rows.map((rowItems, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full items-start gap-[26px] px-[26px] py-[5px]"
          >
            {rowItems.map((b) => (
              <div key={b.id} className="min-w-0 flex-1">
                <BookCard
                  book={b}
                  isEditMode={isEditMode}
                  isSelected={selectedIds.has(b.id)}
                  onClick={() => onClickBook(b.id)}
                  onToggleLike={(e) => {
                    e.stopPropagation();
                    onToggleLike(b.id);
                  }}
                />
              </div>
            ))}
            {/* 빈 공간 채우기 (마지막 줄 레이아웃 유지용) */}
            {rowItems.length < 3 &&
              Array.from({ length: 3 - rowItems.length }).map((_, i) => (
                <div key={`empty-${i}`} className="min-w-0 flex-1" />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
