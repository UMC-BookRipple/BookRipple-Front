interface EditUnderBarProps {
  onSelectAll: () => void;
  onDelete: () => void;
  deleteDisabled?: boolean; // 기능 추가
}

const EditUnderBar = ({
  onSelectAll,
  onDelete,
  deleteDisabled = false,
}: EditUnderBarProps) => {
  return (
    <div
      className="fixed bottom-0 z-50 flex w-full items-center justify-end gap-[20px] bg-[#FFFFFF] px-[20px] pt-[10px] pb-[calc(25px+env(safe-area-inset-bottom))] font-[Freesentation]"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      <button
        type="button"
        className="font-weight-[500] cursor-pointer text-[16px] text-[#58534E]"
        onClick={onSelectAll}
      >
        전체선택
      </button>

      <button
        type="button"
        // 기능: 비활성화 시 회색 처리 로직 포함
        className={`font-weight-[500] cursor-pointer text-[16px] ${deleteDisabled ? 'text-[#D9D6D2]' : 'text-[#D75D59]'
          }`}
        onClick={onDelete}
        disabled={deleteDisabled}
      >
        삭제하기
      </button>
    </div>
  );
};

export default EditUnderBar;
