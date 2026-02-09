import React, { useState } from "react";
import Header from "../../components/Header.tsx";
import SearchBar from "../../components/SearchBar_deleteButton.tsx"; // 검색바 컴포넌트
import { dummyBooks } from "../../data/dummyBooks.ts"; // 더미 데이터 (도서)
import SearchEmpty from "../../components/Search/SearchEmpty.tsx"; // 검색 결과 없을 때
import SearchResult from "../../components/Recommend/RecommendResult.tsx"; // 검색 결과 리스트
import RecentSearchItem from "../../components/RecentSearchItem.tsx";

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


    /* 🔹 최근 검색어 불러오기 */
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        const stored = localStorage.getItem("recentSearches");
        return stored ? JSON.parse(stored) : [];
    });

    /* 🔹 검색 결과 */
    const results =
        query.trim() === ""
            ? null
            : dummyBooks.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
            );


    // 검색어 입력 처리
    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    };

    /* 🔹 Enter → 검색 + 최근 검색어 저장 */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim() !== "") {
            setSearchQuery(query);

            const updated = [
                query,
                ...recentSearches.filter((q) => q !== query),
            ].slice(0, 5);

            setRecentSearches(updated);
            localStorage.setItem("recentSearches", JSON.stringify(updated));
        }
    };

    /* 🔹 최근 검색어 클릭 */
    const handleSelectRecent = (keyword: string) => {
        setQuery(keyword);
        setSearchQuery(keyword);
    };

    /* 🔹 최근 검색어 개별 삭제 */
    const handleRemoveRecent = (keyword: string) => {
        const updated = recentSearches.filter((item) => item !== keyword);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    };

    /* 🔹 전체 삭제 */
    const handleClearAll = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
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
                            {recentSearches.map((keyword, idx) => (
                                <RecentSearchItem
                                    key={idx}
                                    keyword={keyword}
                                    onSelect={handleSelectRecent}
                                    onRemove={handleRemoveRecent}
                                />
                            ))}
                        </div>
                    </div>
                ) : results && results.length > 0 ? (
                    <SearchResult query={query} />
                ) : (
                    <SearchEmpty />
                )}
            </div>



        </div>
    );
};

export default RecommendBookSearchPage;
