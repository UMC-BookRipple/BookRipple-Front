import QnACard from "../QnAcard_community";
import { type BookQuestionItem } from "../../api/questionApi"; // 타입 임포트

interface QnAListProps {
    questions: BookQuestionItem[];
    onSelectQuestion: (question: BookQuestionItem) => void; // 카드 클릭 시 부모에게 알림
}

const QnAList: React.FC<QnAListProps> = ({ questions, onSelectQuestion }) => {
    return (
        <div className="flex flex-col gap-[24px]">
            {questions.map((q) => (
                <button
                    key={q.id}
                    className="flex flex-col gap-[20px] text-left"
                    onClick={() => onSelectQuestion(q)}
                >
                    {/* 질문 카드 */}
                    <QnACard
                        variant={q.isMine ? "my-question" : "question"}
                        content={q.content}
                    />

                    {/* 답변 카드들 */}
                    {(q.answers ?? []).map((a) => (
                        <QnACard key={a.id} variant="answer" content={a.content} />
                    ))}


                    {/* 질문 묶음 구분선 */}
                    <div className="w-full h-[0.7px] bg-black opacity-30" />
                </button>
            ))}
        </div>
    );
};

export default QnAList;
