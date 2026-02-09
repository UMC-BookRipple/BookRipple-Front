interface EditUnderBarProps {
  onSelectAll: () => void;
  onDelete: () => void;
}

const EditUnderBar = ({ onSelectAll, onDelete }: EditUnderBarProps) => {
  return (
    <div
      className="fixed bottom-0 z-50 flex w-[402px] items-center justify-end gap-[15px] bg-[#FFFFFF] px-[20px] pt-[10px] pb-[25px] font-[Freesentation]"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      <span
        className="font-weight-[500] cursor-pointer text-[16px] text-[#58534E]"
        onClick={onSelectAll}
      >
        전체선택
      </span>
      <span
        className="font-weight-[500] cursor-pointer text-[16px] text-[#D75D59]"
        onClick={onDelete}
      >
        삭제하기
      </span>
    </div>
  );
};

export default EditUnderBar;
