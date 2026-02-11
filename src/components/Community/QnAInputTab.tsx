import React, { useState } from "react";
import MyQuestionsHeader from "../Button/MyQuestionHeader";
import QnACard from "../QnAcard_community";
import TextInput from "../TextInput"; // TextInput 컴포넌트 불러오기
import {
    type BookQuestionItem,
    createQuestionAnswer,
    getQuestionAnswers,
    type AnswerItem,
} from "../../api/questionApi"; // 타입 임포트



interface QnAInputTabProps {
    showMyQuestions: boolean;
    onToggleQuestions: () => void;
    selectedQuestion: BookQuestionItem | null; // 선택된 질문
    onBack: () => void;
    onUpdateQuestionAnswers?: (questionId: number, answers: AnswerItem[]) => void;
}


const QnAInputTab: React.FC<QnAInputTabProps> = ({
    showMyQuestions,
    onToggleQuestions,
    selectedQuestion,
    //onBack,
    onUpdateQuestionAnswers,
}) => {

    const [answer, setAnswer] = useState("");
    const [toastVisible, setToastVisible] = useState(false); // 토스트 visible 상태
    const [toastMessage, setToastMessage] = useState(""); // 토스트 메시지 상태
    const [localQuestion, setLocalQuestion] = useState<BookQuestionItem | null>(selectedQuestion);


    const handleAnswerSubmit = async () => {
        if (!answer.trim() || !selectedQuestion) return;

        try {
            await createQuestionAnswer({
                questionId: selectedQuestion.id,
                body: { content: answer }, // ContentReq 형식
            });



            setToastMessage("답변이 등록되었습니다");
            setToastVisible(true);
            setAnswer("");

            // ✅ 등록 후 화면 갱신: 새로운 답변 가져오기
            const ansRes = await getQuestionAnswers(selectedQuestion.id);

            setLocalQuestion({
                ...selectedQuestion,
                answers: ansRes.result.ansList,
            });

            onUpdateQuestionAnswers?.(selectedQuestion.id, ansRes.result.ansList);



            setTimeout(() => {
                setToastVisible(false);
            }, 3000);

        } catch {
            setToastMessage("답변 등록에 실패했습니다");
            setToastVisible(true);
        }
    };


    return (
        <div className="flex flex-col h-full relative">
            {/* 나의 질문 / 사람들의 질문 버튼 */}
            <div className="flex justify-end items-center px-[20px] mb-[10px]">
                <MyQuestionsHeader
                    showMyQuestions={showMyQuestions}
                    onToggle={onToggleQuestions}
                />
            </div>

            {/* 선택된 질문과 관련된 답변들 */}
            <div className="px-[16px] py-[10px] overflow-y-auto flex-1">
                {selectedQuestion ? (
                    <div className="flex flex-col gap-[20px]">
                        <QnACard
                            variant={selectedQuestion.isMine ? "my-question" : "question"}
                            content={selectedQuestion.content}
                        />
                        {localQuestion?.answers?.map((answer) => (
                            <QnACard
                                key={answer.id}
                                variant="answer"
                                content={answer.content}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-[#827A74]">선택된 질문이 없습니다.</div>
                )}
            </div>

            {/* TextInput 컴포넌트 (답변 작성 영역) */}
            <div className="px-[20px] py-[12px] bg-[#F7F5F1] fixed bottom-0 left-0 w-full">
                <TextInput
                    value={answer}
                    onChange={setAnswer}
                    onSubmit={handleAnswerSubmit}
                />
            </div>

            {toastVisible && (
                <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-50">
                    <div className="inline-flex justify-center items-center gap-[10px] px-[10px] py-[4px] rounded-[20px] bg-[#827A74]">
                        <span className="text-white text-[14px] font-[500] font-[Freesentation] leading-normal whitespace-nowrap">
                            {toastMessage}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QnAInputTab;
