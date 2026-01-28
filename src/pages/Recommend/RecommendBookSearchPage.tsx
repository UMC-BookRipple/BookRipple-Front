import React, { useState } from "react";
import Header from "../../components/Header.tsx";
import SearchBar from "../../components/SearchBar_deleteButton.tsx"; // 검색바 컴포넌트
import { dummyBooks } from "../../data/dummyBooks.ts"; // 더미 데이터 (도서)
import SearchEmpty from "../../components/Search/SearchEmpty.tsx"; // 검색 결과 없을 때
import SearchResult from "../../components/Recommend/RecommendResult.tsx"; // 검색 결과 리스트

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

    // 검색어 입력 처리
    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchQuery(query); // 엔터 시 검색 적용
        }
    };

    // 검색 결과 필터링
    const results =
        query.trim() === ""
            ? null
            : dummyBooks.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
            );

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
                {results === null ? (
                    <div className="text-[#827A74]">
                        최근 검색어 영역 (추후 구현)
                    </div>
                ) : results.length === 0 ? (
                    <SearchEmpty />
                ) : (
                    <>
                        <SearchResult query={query} />
                    </>
                )}
            </div>



        </div>
    );
};

export default RecommendBookSearchPage;
