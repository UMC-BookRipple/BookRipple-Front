import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import MyQuestionsHeader from "../Button/MyQuestionHeader";
import QnACard from "../QnAcard_community";
import QnASearchTab from "./QnASearchTab";
import QnAInputTab from "./QnAInputTab"; // QnAInputTab 컴포넌트 추가
import {
    getBookQuestions, type BookQuestionItem, getQuestionAnswers
    , type AnswerItem
} from "../../api/questionApi"; // 타입 임포트
import { useNavigate } from "react-router-dom";



type QnAView = "list" | "search" | "input";

interface QnATabProps {
    bookId: number;
}

const QnATab: React.FC<QnATabProps> = ({ bookId }) => {

    const [view, setView] = useState<QnAView>("list");
    const [showMyQuestions, setShowMyQuestions] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어
    const [selectedQuestion, setSelectedQuestion] = useState<BookQuestionItem | null>(null); // 선택된 질문
    const [questions, setQuestions] = useState<BookQuestionItem[]>([]); // 질문 목록
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleUpdateQuestionAnswers = (questionId: number, answers: AnswerItem[]) => {
        setQuestions(prev =>
            prev.map(q => q.id === questionId ? { ...q, answers } : q)
        );
    };

    useEffect(() => {
        if (!bookId) return;

        const fetchQuestions = async () => {
            if (!bookId) return;

            try {
                setLoading(true);

                // 1️⃣ 질문 가져오기
                const res = await getBookQuestions({

                    bookId,
                    onlyMine: showMyQuestions,
                    keyword: searchQuery || undefined,
                    size: 20,
                });

                console.log("질문 목록 응답:", res);  // 응답 확인

                // 2️⃣ showMyQuestions 필터 적용
                const filteredQuestions = showMyQuestions
                    ? res.result.questionList.filter(q => q.type === "USER")  // type이 "USER"인 질문만 필터링
                    : res.result.questionList;


                console.log("필터링된 질문 목록:", filteredQuestions);

                // 3️⃣ 각 질문별 답변 가져오기
                const questionsWithAnswers = await Promise.all(
                    filteredQuestions.map(async (q) => {
                        try {
                            const ansRes = await getQuestionAnswers(q.id);
                            return { ...q, answers: ansRes.result.ansList };
                        } catch {
                            return { ...q, answers: [] };
                        }
                    })
                );

                console.log("질문과 답변:", questionsWithAnswers);

                // 4️⃣ 상태 업데이트
                setQuestions(questionsWithAnswers);

            } catch (error: unknown) {
                console.error("질문 목록 조회 실패:", error);

                // 🔹 독서 세션 없을 때 처
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ code?: string; message?: string }>;

                    if (axiosError.response?.data?.code === "READING_404") {
                        setErrorMessage("이 책에 대한 독서 세션이 없습니다.");
                    } else if (axiosError.response?.status === 403) {
                        setErrorMessage("질문은 책을 30% 이상 읽어야 합니다.");
                    } else {
                        setErrorMessage("질문 목록을 불러오는 중 오류가 발생했습니다.");
                    }
                } else if (error instanceof Error) {
                    // 일반 JS 오류
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("알 수 없는 오류가 발생했습니다.");
                }
            } finally {
                setLoading(false);
            }
        };


        fetchQuestions();
    }, [bookId, showMyQuestions, searchQuery]);



    // 🔍 검색 화면이면 QnASearchTab만 보여줌
    if (view === "search") {
        return (
            <QnASearchTab
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showMyQuestions={showMyQuestions}
                onToggleQuestions={() => setShowMyQuestions((prev) => !prev)}
                onBack={() => setView("list")}
                onSelectQuestion={(question: BookQuestionItem) => {
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
                onUpdateQuestionAnswers={handleUpdateQuestionAnswers}
            />
        );
    }



    // 질문 목록 필터링
    const filteredQuestions = questions;




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

                {loading && (
                    <div className="text-center text-gray-400 py-8">
                        질문 불러오는 중...
                    </div>
                )}

                {errorMessage && (
                    <div className="text-center text-red-500 py-8">
                        {errorMessage}
                    </div>
                )}


                {!loading && filteredQuestions.map((q) => (
                    <div key={q.id} className="flex flex-col gap-[12px]">
                        {/* 질문 카드 버튼 */}
                        <QnACard
                            variant={q.type === "USER" ? "my-question" : "question"}
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
                        onClick={() => navigate(`/books/${bookId}/questions/new`)}
                    >
                        질문 등록하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default QnATab;
