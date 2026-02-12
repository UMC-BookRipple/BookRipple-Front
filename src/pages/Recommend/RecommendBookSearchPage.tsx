import React, { useState, useEffect } from "react";
import Header from "../../components/Header.tsx";
import SearchBar from "../../components/SearchBar_deleteButton.tsx"; // 검색바 컴포넌트
import SearchEmpty from "../../components/Search/SearchEmpty.tsx"; // 검색 결과 없을 때
import SearchResult from "../../components/Recommend/RecommendResult.tsx"; // 검색 결과 리스트
import RecentSearchItem from "../../components/RecentSearchItem.tsx";
import { useNavigate, useLocation } from "react-router-dom";

import {
    searchBooks,
    type Book,
    fetchBookSearchHistory,
    type SearchHistoryItem,
    deleteSearchHistoryById,
    deleteAllSearchHistory,
    getBookDetailByAladinId,
} from "../../api/books";

interface RecommendBookSearchPageProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // 부모에서 searchQuery를 관리
    onBack: () => void;
}

const RecommendBookSearchPage: React.FC<RecommendBookSearchPageProps> = ({
    searchQuery,
    setSearchQuery,

}) => {
    const [query, setQuery] = useState(searchQuery);
    const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
    const [results, setResults] = useState<Book[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const baseBook = location.state; // BookshelfSearchPage에서 넘어온 기준 도서


    // 페이지 로드 시 최근 검색어 불러오기 (book 타입)
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const items = await fetchBookSearchHistory();
                setRecentSearches(items);
            } catch (e) {
                console.error("최근 검색어 조회 실패", e);
                setRecentSearches([]);
            }
        };
        fetchHistory();
    }, []);


    // 검색어 입력 처리
    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    };

    // Enter → 검색 + 최근 검색어 저장
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim() !== "") {
            setSearchQuery(query);

            try {
                // 검색 결과 가져오기 (book 타입)
                const items = await searchBooks(query, "BOOK");
                setResults(items);

                // 최신 최근 검색어 갱신 (book 타입)
                const history = await fetchBookSearchHistory();
                setRecentSearches(history);
            } catch (err) {
                console.error("도서 검색 실패:", err);
                setResults([]);
            }
        }
    };

    // 최근 검색어 클릭
    const handleSelectRecent = async (keyword: string) => {
        setQuery(keyword);
        setSearchQuery(keyword);

        try {
            const items = await searchBooks(keyword, "BOOK");
            setResults(items);
        } catch (err) {
            console.error("도서 검색 실패:", err);
            setResults([]);
        }
    };

    /* 🔹 최근 검색어 개별 삭제 */
    const handleRemoveRecent = async (historyId: number) => {
        try {
            await deleteSearchHistoryById(historyId);
            setRecentSearches((prev) => prev.filter((item) => item.historyId !== historyId));
        } catch (e) {
            console.error("검색 기록 삭제 실패", e);
        }
    };

    /* 🔹 전체 삭제 */
    const handleClearAll = async () => {
        try {
            await deleteAllSearchHistory("BOOK");
            setRecentSearches([]);
        } catch (e) {
            console.error("검색 기록 전체 삭제 실패", e);
        }
    };

    /** 🔹 핵심: 검색 결과 선택 */
    const handleSelectBook = async (book: Book) => {
        try {
            const detail = await getBookDetailByAladinId(book.aladinItemId);
            const bookForPage = {
                bookId: detail.bookId,
                aladinId: book.aladinItemId,
                title: detail.title,
                author: detail.author,
                imageUrl: detail.coverUrl, // coverUrl → imageUrl로 매핑
            };

            navigate("/recommend/write", {
                state: {
                    baseBook,          // 기준 도서
                    recommendedBook: bookForPage,  // 추천 도서
                },
            });
        } catch (e) {
            console.error("도서 상세 조회 실패", e);
        }
    };


    return (
        <div className="flex flex-col h-screen w-full bg-[#F7F5F1]">
            {/* Header */}
            <Header />

            {/* 검색바 */}
            <div className="w-full">
                <SearchBar
                    placeholder="도서 제목, 작가명으로 추천 도서 검색하기"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* 검색 결과 영역 */}
            <div className="flex-1 px-[16px] py-[10px] overflow-y-auto">
                {query.trim() === "" ? (
                    <div>
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

                        <div className="flex gap-2 overflow-x-auto">
                            {recentSearches.map((item) => (
                                <RecentSearchItem
                                    key={item.historyId}
                                    keyword={item.keyword}
                                    onSelect={handleSelectRecent}
                                    onRemove={() => handleRemoveRecent(item.historyId)}
                                />
                            ))}
                        </div>
                    </div>
                ) : results.length > 0 ? (
                    <SearchResult query={searchQuery}
                        onSelect={handleSelectBook}
                    />
                ) : (
                    <SearchEmpty />
                )}
            </div>



        </div>
    );
};

export default RecommendBookSearchPage;
