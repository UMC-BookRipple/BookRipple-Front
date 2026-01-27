import TrashIcon from '../assets/icons/M-trash.svg';
import WriteIcon from '../assets/icons/M-write.svg';

type CardVariant =
  | 'question'
  | 'my-question'
  | 'answer'
  | 'random-question'
  | 'reading-ai-question';

interface QnACardProps {
  variant: CardVariant;
  content: string;
  className?: string;

  onDelete?: () => void;
  onEdit?: () => void;

  // 아이콘 표시 여부 (핸들러가 있어도 숨길 수 있음)
  showDeleteIcon?: boolean; // default: true
  showEditIcon?: boolean; // default: true

  isEditing?: boolean;
  draft?: string;
  onChangeDraft?: (next: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function QnACard({
  variant,
  content,
  className = '',
  onDelete,
  onEdit,
  showDeleteIcon = true,
  showEditIcon = true,
  isEditing = false,
  draft = '',
  onChangeDraft,
  onSave,
  onCancel,
}: QnACardProps) {
  const label = variant === 'answer' ? 'A' : 'Q';

  const styles: Record<
    CardVariant,
    { bg: string; labelColor: string; textColor: string; textSize: string }
  > = {
    question: {
      bg: 'bg-[#827A74]',
      labelColor: 'text-white',
      textColor: 'text-white',
      textSize: 'text-[16px]',
    },
    'random-question': {
      bg: 'bg-[#827A74]',
      labelColor: 'text-white',
      textColor: 'text-white',
      textSize: 'text-[18px]',
    },
    'reading-ai-question': {
      bg: 'bg-[#E6E6E6]',
      labelColor: 'text-[#58534E]',
      textColor: 'text-[#58534E]',
      textSize: 'text-[16px]',
    },
    'my-question': {
      bg: 'bg-[#BDB7B2]',
      labelColor: 'text-[#58534E]',
      textColor: 'text-[#58534E]',
      textSize: 'text-[16px]',
    },
    answer: {
      bg: 'bg-white',
      labelColor: 'text-[#58534E]',
      textColor: 'text-[#58534E]',
      textSize: 'text-[16px]',
    },
  };

  const currentStyle = styles[variant];

  const handleIconClick =
    (fn?: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fn?.();
    };

  const canShowEdit = Boolean(onEdit) && showEditIcon;
  const canShowDelete = Boolean(onDelete) && showDeleteIcon;

  return (
    <div
      className={`relative flex w-full flex-col gap-[24px] rounded-[10px] p-[16px] ${currentStyle.bg} ${className}`}
    >
      {(canShowEdit || canShowDelete) && (
        <div className="absolute top-[16px] right-[16px] flex items-center gap-[10px]">
          {canShowEdit && (
            <button
              type="button"
              onClick={handleIconClick(onEdit)}
              className="p-1"
            >
              <img src={WriteIcon} alt="수정" className="h-[18px] w-[19px]" />
            </button>
          )}
          {canShowDelete && (
            <button
              type="button"
              onClick={handleIconClick(onDelete)}
              className="p-1"
            >
              <img src={TrashIcon} alt="삭제" className="h-[18px] w-[19px]" />
            </button>
          )}
        </div>
      )}

      <div
        className={`font-gmarket text-[20px] leading-normal font-bold ${currentStyle.labelColor}`}
      >
        {label}
      </div>

      {variant === 'answer' && isEditing ? (
        <div className="flex w-full flex-col gap-[10px]">
          <textarea
            value={draft}
            onChange={(e) => onChangeDraft?.(e.target.value)}
            className="w-full resize-none rounded-[10px] border border-[#D9D6D2] bg-white p-[12px] font-sans text-[16px] leading-[1.2] text-[#58534E] outline-none"
            rows={4}
          />
          <div className="flex justify-end gap-[10px]">
            <button
              type="button"
              onClick={handleIconClick(onCancel)}
              className="rounded-[8px] px-[10px] py-[6px] text-[14px] text-[#58534E]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleIconClick(onSave)}
              className="rounded-[8px] bg-[#58534E] px-[10px] py-[6px] text-[14px] text-white"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`font-sans font-normal ${currentStyle.textSize} leading-[1.2] whitespace-pre-wrap ${currentStyle.textColor}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
