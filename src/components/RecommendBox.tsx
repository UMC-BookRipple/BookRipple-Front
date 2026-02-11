import penIcon from "../assets/icons/penIcon.svg";
import trashIcon from "../assets/icons/trashIcon.svg";
import { useState } from "react";

interface MyRecordBoxProps {
    bookName: string
    content?: string

    canEdit?: boolean
    canDelete?: boolean

    onEdit?: (newContent: string) => void
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
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);

    const handleSave = () => {
        if (onEdit) onEdit(editContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditContent(content);
        setIsEditing(false);
    };

    return (

        <div className="flex flex-col gap-[25px] p-[14px] bg-[#FFF] text-[#58534E] font-[Freesentation] rounded-[10px]">
            <div className="w-full flex items-center justify-between">
                <span>{bookName}</span>

                {(canEdit || canDelete) && (
                    <div className="flex gap-[4px]">
                        {canEdit && !isEditing && (
                            <button onClick={() => setIsEditing(true)}>
                                <img src={penIcon} alt="펜 이미지" />
                            </button>
                        )}
                        {canDelete && (
                            <button onClick={onDelete}>
                                <img src={trashIcon} alt="휴지통 이미지" />
                            </button>
                        )}

                    </div>
                )}
            </div>

            {/* 내용 표시 / 수정 */}
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="border rounded p-2 w-full"
                        rows={3}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            저장
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-300 text-black px-2 py-1 rounded"
                        >
                            취소
                        </button>
                    </div>
                </div>
            ) : (
                <p>{content}</p>
            )}
        </div>
    )
}

export default MyRecordBox;