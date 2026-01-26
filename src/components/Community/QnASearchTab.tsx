import React, { useState } from "react";
import SearchBar from "../SearchBar";
import { dummyQnA } from "../../data/dummyQnA";
import QnAList from "./QnAList";
import SearchEmpty from "../Search/SearchEmpty";
import MyQuestionsHeader from "../Button/MyQuestionHeader";

interface QnASearchTabProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showMyQuestions: boolean;
    onToggleQuestions: () => void;
    onBack: () => void;
    onSelectQuestion: (question: typeof dummyQnA[0]) => void; // 선택된 질문 전달
}

const QnASearchTab: React.FC<QnASearchTabProps> = ({
    searchQuery,
    setSearchQuery,
    showMyQuestions,
    onToggleQuestions,
    onBack,
    onSelectQuestion,
}) => {
    const [query, setQuery] = useState(searchQuery);

    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchQuery(query); // 엔터 시 검색 적용
        }
    };

    // 🔹 항상 최신 query와 showMyQuestions 기반으로 필터링
    const results =
        query.trim() === ""
            ? null // 검색 안함
            : dummyQnA
                .filter((q) => (showMyQuestions ? q.isMine : true))
                .filter((q) =>
                    q.content.toLowerCase().includes(query.toLowerCase())
                );

    return (
        <div className="flex flex-col h-full relative">
            {/* 검색바 */}
            <div>
                <SearchBar
                    placeholder="질문 검색하기"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* 나의 질문 / 사람들의 질문 버튼 */}
            <div className="flex justify-end items-center px-[20px] mb-[10px]">
                <MyQuestionsHeader
                    showMyQuestions={showMyQuestions}
                    onToggle={onToggleQuestions}
                />
            </div>

            {/* 검색 결과 영역 */}
            <div className="flex-1 px-[16px] py-[10px] overflow-y-auto">
                {results === null ? (
                    <div className="text-[#827A74]">최근 검색어 영역 (추후 구현)</div>
                ) : results.length === 0 ? (
                    <SearchEmpty />
                ) : (
                    <>
                        <div className="mb-[10px] text-[#827A74]">
                            총 {results.length}건의 검색 결과가 있습니다.
                        </div>
                        <QnAList
                            questions={results}
                            onSelectQuestion={onSelectQuestion} // 클릭 시 부모에 전달
                        />
                    </>
                )}
            </div>

            {/* 뒤로가기 */}
            <button
                onClick={onBack}
                className="px-[20px] py-[12px] text-[#58534E] text-[14px]"
                style={{ fontFamily: "Freesentation" }}
            >
                ← 뒤로가기
            </button>
        </div>
    );
};

export default QnASearchTab;
