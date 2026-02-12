interface Props {
  onToggleAll: () => void;
  onDelete: () => void;
}

export default function BottomSelectBar({
  onToggleAll,
  onDelete,
}: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="fixed bottom-[0px] flex h-[64px] w-full max-w-[430px] items-center justify-end gap-[5px] bg-[#FFFFFF] px-[20px] pt-[10px] pb-[25px] font-[Freesentation]">
          <span
            className="font-weight-[500] cursor-pointer text-[16px] text-[#58534E]"
            onClick={onToggleAll}
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
      </div>
    </div>
  );
}
