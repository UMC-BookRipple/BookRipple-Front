type Props = {
  onSelectAll: () => void;
  onDelete: () => void;
};

export default function EditBottomBar({ onSelectAll, onDelete }: Props) {
  return (
    <div className="absolute bottom-0 z-10 flex w-full max-w-[402px] items-center justify-end gap-[10px] bg-white px-[20px] pt-[10px] pb-[25px]">
      <button
        type="button"
        onClick={onSelectAll}
        className="font-[Freesentation] text-[16px] leading-normal font-medium text-[#58534E]"
      >
        전체선택
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="font-[Freesentation] text-[16px] leading-normal font-medium text-[#D75D59]"
      >
        삭제하기
      </button>
    </div>
  );
}
