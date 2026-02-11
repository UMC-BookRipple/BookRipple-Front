import penIcon from "../assets/icons/penIcon.svg";
import trashIcon from "../assets/icons/trashIcon.svg";
import { useState } from "react";

interface AnswerBoxProps {
    answer: string;
    canEdit?: boolean;
    canDelete?: boolean;
    onEditAnswer?: (newContent: string) => void;
    onDeleteAnswer?: () => void;
}

const AnswerBox = ({
    answer,
    canEdit,
    canDelete,
    onEditAnswer,
    onDeleteAnswer,
}: AnswerBoxProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(answer);

    const handleSave = () => {
        if (onEditAnswer) onEditAnswer(editContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditContent(answer);
        setIsEditing(false);
    };

    return (
        <div className="w-full flex flex-col gap-[20px]">
            {/* 답변 */}
            <div className="w-full bg-white rounded-[10px] p-[16px] flex flex-col gap-[25px]">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[20px] font-[GmarketSansBold] text-[#58534E]">A</span>
                    <div className="flex gap-[4px]">
                        {canEdit && !isEditing && (
                            <button onClick={() => setIsEditing(true)}>
                                <img src={penIcon} alt="펜 이미지" />
                            </button>
                        )}
                        {canDelete && (
                            <button onClick={onDeleteAnswer}>
                                <img src={trashIcon} alt="Delete Answer" />
                            </button>
                        )}
                    </div>
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
                    <p>{answer}</p>
                )}
            </div>
        </div>
    );
};

export default AnswerBox;
