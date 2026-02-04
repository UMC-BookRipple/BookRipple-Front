import React, { useState } from "react";
import MyQuestionsHeader from "../Button/MyQuestionHeader";
import QnACard from "../QnAcard_community";
import TextInput from "../TextInput"; // TextInput 컴포넌트 불러오기
import { dummyQnA } from "../../data/dummyQnA"; // 예시 데이터

interface QnAInputTabProps {
    showMyQuestions: boolean;
    onToggleQuestions: () => void;
    selectedQuestion: typeof dummyQnA[0] | null; // 선택된 질문
    onBack: () => void;
}


const QnAInputTab: React.FC<QnAInputTabProps> = ({
    showMyQuestions,
    onToggleQuestions,
    selectedQuestion,
    //onBack,
}) => {

    const [answer, setAnswer] = useState("");

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
                        {selectedQuestion.answers.map((answer) => (
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
                    onSubmit={() => {
                        console.log("작성한 답변:", answer);
                        setAnswer("");
                    }}
                />
            </div>


        </div>
    );
};

export default QnAInputTab;
