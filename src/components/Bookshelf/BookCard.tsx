import likeOn from '/src/assets/icons/M-like2.svg';
import likeOff from '/src/assets/icons/M-like1.svg';
import checkIcon from '/src/assets/icons/check.svg';
import type { BookItem } from '../../types/bookshelf.type';

type Props = {
  book: BookItem;
  isEditMode: boolean;
  isSelected: boolean;
  onClick: () => void;
  onToggleLike: (e: React.MouseEvent) => void;
};

export default function BookCard({
  book,
  isEditMode,
  isSelected,
  onClick,
  onToggleLike,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[98px] shrink-0 text-left"
    >
      <div
        className={`relative w-full overflow-hidden border bg-white ${isEditMode && isSelected ? 'border-[#58534E]' : 'border-[#D4CEC6]'}`}
      >
        <div
          className="h-[150px] w-full bg-cover bg-center bg-no-repeat"
          style={{
            background:
              isEditMode && isSelected
                ? `linear-gradient(0deg, rgba(215, 215, 215, 0.90) 0%, rgba(215, 215, 215, 0.90) 100%), url(${book.coverUrl}) lightgray 50% / cover no-repeat`
                : `linear-gradient(180deg, rgba(0, 0, 0, 0.66) 0.25%, rgba(0, 0, 0, 0.00) 38.58%), url(${book.coverUrl}) lightgray 50% / cover no-repeat`,
            boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
            width: '100%',
          }}
        />

        {!(isEditMode && isSelected) && (
          <div
            role="button"
            tabIndex={0}
            onClick={onToggleLike}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onToggleLike(e as unknown as React.MouseEvent);
              }
            }}
            className="absolute top-[5px] left-[5px] z-10 flex cursor-pointer items-center justify-center transition-opacity active:scale-95"
          >
            <img
              src={book.isLiked ? likeOn : likeOff}
              alt="like"
              className="h-7 w-7 drop-shadow-sm"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        )}

        {isEditMode && (
          <div className="absolute inset-0 grid place-items-center">
            {isSelected && (
              <div className="grid h-16 w-16 place-items-center">
                <img
                  src={checkIcon}
                  alt="selected"
                  className="h-[37px] w-[37px]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-[5px] flex w-full items-center self-stretch py-[5px] font-[Freesentation] text-[14px] leading-tight font-medium text-[#58534E]">
        {book.title}
      </div>
    </button>
  );
}
