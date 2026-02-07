import { useState } from 'react';
import WriteIcon from '../../assets/icons/M-write.svg';
import TrashIcon from '../../assets/icons/M-trash.svg';

interface MemoCardProps {
  id: number;
  title: string;
  content: string;
  isSelected: boolean;
  isSelectionMode: boolean;
  onToggleSelect: (id: number) => void;
  onDelete: (id: number) => void | Promise<void>;
  onUpdate: (id: number, content: string) => void | Promise<void>;
}

export default function MemoCard({
  id,
  title,
  content,
  isSelected,
  isSelectionMode,
  onToggleSelect,
  onDelete,
  onUpdate,
}: MemoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(content);

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(content);
      setIsEditing(false);
      return;
    }
    await onUpdate(id, trimmed);
    setIsEditing(false);
  };

  const handleCardClick = () => {
    if (isSelectionMode) {
      onToggleSelect(id);
    }
  };

  return (
    <article
      className={`rounded-[10px] border bg-white p-[16px] ${
        isSelected ? 'border-[#58534E]' : 'border-[#E3DED8]'
      } ${isSelectionMode ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between self-stretch">
        <p className="font-sans text-[16px] leading-normal font-[500] whitespace-pre-wrap text-[#58534E] not-italic">
          {title}
        </p>

        <div className="flex items-center gap-[4px]">
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
              <img src={WriteIcon} alt="수정" className="h-[28px] w-[28px]" />
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
            <img src={TrashIcon} alt="삭제" className="h-[28px] w-[28px]" />
          </button>
        </div>
      </div>
      <div className="mt-[25px] self-stretch font-sans text-[16px] leading-normal font-[400] text-[#58534E] not-italic">
        {isEditing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
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
