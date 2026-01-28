import M_trash from "../../assets/icons/M_trash.svg"
import M_write from "../../assets/icons/M_write.svg"

interface QuestionBoxProps {
    question: string
    answer?: string

    canDelete?: boolean
    canEdit?: boolean

    onDeleteQuestion?: () => void
    onEditAnswer?: () => void
    onDeleteAnswer?: () => void
}

const QuestionBox = ({
    question,
    answer,
    canDelete,
    canEdit,
    onDeleteQuestion,
    onEditAnswer,
    onDeleteAnswer,
}: QuestionBoxProps) => {
    return (
        <div className="w-full flex flex-col gap-[20px]">
            {/* 질문 */}
            <div className="w-full bg-[#BDB7B2] rounded-[10px] p-[16px] flex flex-col gap-[25px]">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[20px] font-[GmarketSansBold] text-[#58534E]">Q</span>
                    {canDelete && (
                        <button onClick={onDeleteQuestion}>
                            <img src={M_trash} alt="" />
                        </button>
                    )}
                </div>
                <p className="text-[16px] text-[#58534E]">{question}</p>
            </div>

            {/* 답변 */}
            {answer && (
                <div className="w-full bg-[#FFF] rounded-[10px] p-[16px] flex flex-col gap-[25px]">
                    <div className="w-full flex justify-between items-center">
                        <span className="text-[20px] font-[GmarketSansBold] text-[#58534E]">A</span>
                        <div className="flex gap-[4px]">
                            {canEdit && (
                                <button onClick={onEditAnswer}><img src={M_write} alt="" /></button>
                            )}
                            {canDelete && (
                                <button onClick={onDeleteAnswer}><img src={M_trash} alt="" /></button>
                            )}
                        </div>
                    </div>
                    <p className="text-[16px] text-[#58534E]">{answer}</p>
                </div>
            )}
        </div>
    )
}

export default QuestionBox;
