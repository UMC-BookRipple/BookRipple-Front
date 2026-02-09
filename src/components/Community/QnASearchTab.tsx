import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar_deleteButton";
import QnAList from "./QnAList";
import SearchEmpty from "../Search/SearchEmpty";
import MyQuestionsHeader from "../Button/MyQuestionHeader";
import RecentSearchItem from "../RecentSearchItem";
import { type Question, searchQuestions } from "../../api/Community/qna";
import { fetchCommunitySearchHistory } from "../../api/books";
import type { SearchHistoryItem } from "../../api/books";
import { deleteSearchHistoryById } from "../../api/books";
import { deleteAllSearchHistory } from "../../api/books";
import { searchBooks } from "../../api/books"; // 가짜 검색용 API 호출 함수




interface QnASearchTabProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showMyQuestions: boolean;
    onToggleQuestions: () => void;
    onBack: () => void;
    onSelectQuestion: (question: Question) => void; // 선택된 질문 전달
    bookId: number; // 도서 ID 추가
}


const QnASearchTab: React.FC<QnASearchTabProps> = ({
    //searchQuery,
    setSearchQuery,
    showMyQuestions,
    onToggleQuestions,
    onBack,
    onSelectQuestion,
    bookId,
}) => {
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] =
        useState<SearchHistoryItem[]>([]);
    const [results, setResults] = useState<Question[]>([]);






    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const items = await fetchCommunitySearchHistory();
                setRecentSearches(items);
            } catch (e) {
                console.error("검색 기록 조회 실패", e);
                setRecentSearches([]);
            }
        };

        fetchHistory();
    }, []);


    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        if (!query.trim() || !bookId) return;

        try {
            // 1️⃣ 질문 검색
            const data = await searchQuestions(bookId, query);
            // 🔥 검색 기록 저장용으로 책 검색 API를 "가짜로" 호출
            await searchBooks(query, "COMMUNITY");
            setResults(data);

            // 2️⃣ 커뮤니티 검색 기록 다시 조회
            const history = await fetchCommunitySearchHistory();
            setRecentSearches(history);
        } catch (e) {
            console.error("질문 검색 실패", e);
            setResults([]);
        }
    };





    /** 최근 검색어 클릭 */
    const handleSelectRecent = async (keyword: string) => {
        setQuery(keyword);
        setSearchQuery(keyword);

        if (!bookId) return;

        try {
            const data = await searchQuestions(bookId, keyword);
            setResults(data);

            const history = await fetchCommunitySearchHistory();
            setRecentSearches(history);
        } catch (e) {
            console.error("질문 검색 실패", e);
            setResults([]);
        }
    };




    /** 최근 검색어 삭제 */
    const handleRemoveRecent = async (historyId: number) => {
        try {
            await deleteSearchHistoryById(historyId);

            setRecentSearches((prev) =>
                prev.filter((item) => item.historyId !== historyId)
            );
        } catch (e) {
            console.error("검색 기록 삭제 실패", e);
        }
    };


    /** 전체 삭제 */
    const handleClearAll = async () => {
        await deleteAllSearchHistory();
        setRecentSearches([]);
    };




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



            {/* 나의 질문 / 사람들의 질문 버튼 (검색 결과가 있을 때만 표시) */}
            {results.length > 0 && (
                <div className="flex justify-end items-center px-[20px] mb-[10px]">
                    <MyQuestionsHeader
                        showMyQuestions={showMyQuestions}
                        onToggle={onToggleQuestions}
                    />
                </div>
            )}

            {/* 검색 결과 영역 */}
            <div className="flex-1 px-[16px] py-[10px] overflow-y-auto">
                {query.trim() === "" ? (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#58534E] text-[14px] font-[Freesentation]">
                                최근 검색어
                            </span>
                            {recentSearches.length > 0 && (
                                <button
                                    onClick={handleClearAll}
                                    className="text-[#58534E] text-[14px]"
                                >
                                    전체 삭제
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {recentSearches.map((item) => (
                                <RecentSearchItem
                                    key={item.historyId}
                                    keyword={item.keyword}
                                    onSelect={handleSelectRecent}
                                    onRemove={() => handleRemoveRecent(item.historyId)}
                                />
                            ))}

                        </div>
                    </>
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
