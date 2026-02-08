const EditUnderBar = ({ onSelectAll, onDelete }: { onSelectAll: () => void, onDelete: () => void }) => {


    return (
        <div className="fixed bottom-[0px] w-full h-[64px] bg-[#FFFFFF] px-[20px] pb-[25px] pt-[10px] gap-[5px] flex justify-end items-center font-[Freesentation]">
            <span className="text-[16px] font-weight-[500] text-[#58534E]" onClick={onSelectAll}>
                전체선택
            </span>
            <span className="text-[16px] font-weight-[500] text-[#D75D59]" onClick={onDelete}>
                삭제하기
            </span>
        </div>
    )
}

export default EditUnderBar;