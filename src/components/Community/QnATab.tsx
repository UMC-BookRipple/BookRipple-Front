import React, { useState } from "react";
import MyQuestionsHeader from "../Button/MyQuestionHeader";
import QnACard from "../QnAcard_community";
import QnASearchTab from "./QnASearchTab";
import QnAInputTab from "./QnAInputTab"; // QnAInputTab 컴포넌트 추가
//import { fetchQuestions } from "../../api/Community/qna"; // API 호출 함수 임포트
import { type Question } from "../../api/Community/qna"; // 타입 임포트


type QnAView = "list" | "search" | "input";

interface QnATabProps {
    bookId: number;
}

const QnATab: React.FC<QnATabProps> = ({ bookId }) => {
    const [view, setView] = useState<QnAView>("list");
    const [showMyQuestions, setShowMyQuestions] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null); // 선택된 질문
    const [questions] = useState<Question[]>([]); // 질문 목록


    // 책의 질문 목록을 API에서 불러옴
    /*useEffect(() => {
        const fetchData = async () => {
            if (searchQuery && bookId) {
                const data = await fetchQuestions(searchQuery, bookId); // 책 ID와 검색어로 질문 목록 가져오기
                setQuestions(data); // 받아온 데이터를 상태에 저장
            }
        };

        fetchData();
    }, [searchQuery, bookId]); // 검색어와 책 ID가 변경될 때마다 호출*/



    // 🔍 검색 화면이면 QnASearchTab만 보여줌
    if (view === "search") {
        return (
            <QnASearchTab
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showMyQuestions={showMyQuestions}
                onToggleQuestions={() => setShowMyQuestions((prev) => !prev)}
                onBack={() => setView("list")}
                onSelectQuestion={(question: Question) => {
                    setSelectedQuestion(question);
                    setView("input");
                }}
                bookId={bookId}
            />
        );
    }

    // QnAInputTab으로 전환
    if (view === "input" && selectedQuestion) {
        return (
            <QnAInputTab
                selectedQuestion={selectedQuestion}
                onBack={() => setView("list")}
                showMyQuestions={showMyQuestions}
                onToggleQuestions={() => setShowMyQuestions((prev) => !prev)}
            />
        );
    }



    // 질문 목록 필터링
    const myQuestions = questions.filter((q) => q.type === "USER");
    const allQuestions = questions.filter((q) => q.type !== "USER");
    const filteredQuestions = showMyQuestions ? myQuestions : allQuestions;

    return (
        <div className="relative flex flex-col h-full">
            {/* 🔍 검색창 진입 버튼 (input처럼 보이지만 버튼 역할) */}
            <div
                className="px-[16px] py-[10px]"
                onClick={() => setView("search")}
            >
                <div className="bg-white rounded-[10px] px-[16px] py-[14px] text-[#58534E]">
                    질문 검색하기
                </div>
            </div>

            {/* 나의 질문 / 사람들의 질문 버튼 */}
            <div className="flex justify-end items-center px-[20px] mb-[10px]">
                <MyQuestionsHeader
                    showMyQuestions={showMyQuestions}
                    onToggle={() => setShowMyQuestions((prev) => !prev)}
                />
            </div>

            {/* 질문 & 답변 리스트 */}
            <div className="flex flex-col gap-[20px] px-[16px] py-[10px] pb-[120px]">
                {filteredQuestions.map((q) => (
                    <div key={q.id} className="flex flex-col gap-[12px]">
                        {/* 질문 카드 버튼 */}
                        <QnACard
                            variant={q.isMine ? "my-question" : "question"}
                            content={q.content}
                            onClick={() => {
                                setSelectedQuestion(q); // 선택된 질문 저장
                                setView("input"); // QnAInputTab으로 전환
                            }}
                        />

                        {/* 답변 카드들 */}
                        {(q.answers ?? []).map((a) => (
                            <QnACard key={a.id} variant="answer" content={a.content} />
                        ))}


                        <div className="w-full h-[0.7px] bg-black opacity-30" />
                    </div>
                ))}
            </div>

            {/* 질문 등록 버튼 (나의 질문일 때만) */}
            {showMyQuestions && (
                <div className="fixed bottom-0 left-0 w-full bg-[#F7F5F1] px-[20px] py-[12px] shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                    <button
                        className="w-full flex justify-center items-center px-[10px] py-[16px] rounded-full bg-[#827A74]"
                        style={{
                            fontFamily: "Freesentation",
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#FFF",
                        }}
                    >
                        질문 등록하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default QnATab;
