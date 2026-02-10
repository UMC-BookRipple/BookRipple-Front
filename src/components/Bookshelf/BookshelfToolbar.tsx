type Props = {
  isEditMode: boolean;
  onToggleEdit: () => void;
};

export default function BookshelfToolbar({ isEditMode, onToggleEdit }: Props) {
  return (
    <div className="mx-auto mt-[10px] flex w-full max-w-[420px] items-center justify-end gap-[10px] self-stretch bg-[#F7F5F1] px-[20px] py-[10px]">
      <button
        type="button"
        onClick={onToggleEdit}
        className="text-right font-[Freesentation] text-[16px] leading-normal font-medium text-[#58534E]"
      >
        {isEditMode ? '완료' : '편집'}
      </button>
    </div>
  );
}
