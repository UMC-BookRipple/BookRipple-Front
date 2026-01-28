import M_trash from "../../assets/icons/M_trash.svg"
import M_write from "../../assets/icons/M_write.svg"

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
                            <button onClick={onDelete}><img src={M_trash} alt="" /></button>
                        )}
                        {canEdit && (
                            <button onClick={onEdit}><img src={M_write} alt="" /></button>
                        )}
                    </div>
                )}
            </div>

            <p>{content}</p>
        </div>
    )
}

export default MyRecordBox;
