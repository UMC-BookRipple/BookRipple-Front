import { useEffect, useState } from 'react';
import WriteIcon from '../../assets/icons/M-write.svg';
import TrashIcon from '../../assets/icons/M-trash.svg';

interface MemoCardProps {
  id: number;
  title: string; // memoTitle
  content: string; // context
  page: string;
  isSelected: boolean;
  isSelectionMode: boolean;
  onToggleSelect: (id: number) => void;
  onDelete: (id: number) => void | Promise<void>;
  onUpdate: (
    id: number,
    payload: { memoTitle: string; context: string; page: string },
  ) => void | Promise<void>;
}

export default function MemoCard({
  id,
  title,
  content,
  page,
  isSelected,
  isSelectionMode,
  onToggleSelect,
  onDelete,
  onUpdate,
}: MemoCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [draftTitle, setDraftTitle] = useState(title);
  const [draftContent, setDraftContent] = useState(content);
  const [draftPage, setDraftPage] = useState(page);

  useEffect(() => {
    if (!isEditing) {
      setDraftTitle(title);
      setDraftContent(content);
      setDraftPage(page);
    }
  }, [title, content, page, isEditing]);

  const handleSave = async () => {
    const nextTitle = draftTitle.trim();
    const nextContext = draftContent.trim();
    const nextPage = draftPage.trim();

    if (!nextTitle || !nextContext || !nextPage) {
      setDraftTitle(title);
      setDraftContent(content);
      setDraftPage(page);
      setIsEditing(false);
      return;
    }

    await onUpdate(id, {
      memoTitle: nextTitle,
      context: nextContext,
      page: nextPage,
    });
    setIsEditing(false);
  };

  const handleCardClick = () => {
    if (isEditing) return;
    if (isSelectionMode) onToggleSelect(id);
  };

  return (
    <article
      className={`rounded-[10px] border bg-white p-[16px] ${
        isSelected ? 'border-[#58534E]' : 'border-[#E3DED8]'
      } ${isSelectionMode ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between self-stretch">
        <div className="flex min-w-0 flex-1 items-center">
          {isEditing ? (
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="w-full min-w-0 bg-transparent font-sans text-[16px] leading-normal font-[500] whitespace-pre-wrap text-[#58534E] not-italic outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="min-w-0 font-sans text-[16px] leading-normal font-[500] whitespace-pre-wrap text-[#58534E] not-italic">
              {title}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-[4px]">
          {isEditing ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void handleSave();
              }}
              className="text-[14px] font-medium text-[#58534E]"
            >
              저장
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-[#58534E]"
            >
              <img src={WriteIcon} alt="수정" className="h-[22px] w-[22px]" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void onDelete(id);
            }}
            className="text-[#58534E]"
          >
            <img src={TrashIcon} alt="삭제" className="h-[22px] w-[22px]" />
          </button>
        </div>
      </div>

      <div className="mt-[10px] self-stretch font-sans text-[14px] leading-normal font-[400] text-[#58534E] not-italic">
        {isEditing ? (
          <input
            value={draftPage}
            onChange={(e) => setDraftPage(e.target.value)}
            className="w-full rounded-[12px] border border-[#E3DED8] bg-[#FFFDF9] px-3 py-2 outline-none"
            onClick={(e) => e.stopPropagation()}
            placeholder="page"
          />
        ) : (
          <p className="whitespace-pre-wrap">{page}</p>
        )}
      </div>

      <div className="mt-[25px] self-stretch font-sans text-[16px] leading-normal font-[400] text-[#58534E] not-italic">
        {isEditing ? (
          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            className="min-h-[120px] w-full resize-none rounded-[12px] border border-[#E3DED8] bg-[#FFFDF9] p-3 whitespace-pre-wrap"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </article>
  );
}
