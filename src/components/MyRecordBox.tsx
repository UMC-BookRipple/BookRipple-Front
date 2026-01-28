import penIcon from "../assets/icons/penIcon.svg";
import trashIcon from "../assets/icons/trashIcon.svg";

interface MyRecordBoxProps {
    bookName: string
    content?: string

    canEdit?: boolean
    canDelete?: boolean

    onEdit?: () => void
    onDelete?: () => void
}

const MyRecordBox = ({
    bookName,
    content = "독서 기록 내용",
    canEdit,
    canDelete,
    onEdit,
    onDelete,
}: MyRecordBoxProps) => {
    return (
        <div className="flex flex-col gap-[25px] p-[14px] bg-[#FFF] text-[#58534E] font-[Freesentation] rounded-[10px]">
            <div className="w-full flex items-center justify-between">
                <span>{bookName}</span>

                {(canEdit || canDelete) && (
                    <div className="flex gap-[4px]">
                        {canDelete && (
                            <button onClick={onDelete}><img src={penIcon} alt="휴지통 이미지" /></button>
                        )}
                        {canEdit && (
                            <button onClick={onEdit}><img src={trashIcon} alt="펜 이미지" /></button>
                        )}
                    </div>
                )}
            </div>

            <p>{content}</p>
        </div>
    )
}

export default MyRecordBox;
