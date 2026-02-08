import React, { useState } from "react";
import Header from "../../components/Header";
import SearchBar from "../SearchBar_deleteButton"; // 검색바 컴포넌트
import { dummyBooks } from "../../data/dummyBooks"; // 더미 데이터 (도서)
import SearchEmpty from "../Search/SearchEmpty"; // 검색 결과 없을 때
import SearchResult from "../../components/Search/SearchResult";

interface CommunitySearchTabProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // 부모에서 searchQuery를 관리
    onBack: () => void;
}

const CommunitySearchTab: React.FC<CommunitySearchTabProps> = ({
    searchQuery,
    setSearchQuery,
    onBack,
}) => {
    const [query, setQuery] = useState(searchQuery);

    // 검색어 입력 처리
    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    }

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
                    placeholder="제목, 작가명 검색하기"
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

            {/* 뒤로가기 버튼 - 화면 맨 아래 */}
            <div className="px-[20px] py-[12px]">
                <button
                    onClick={onBack}
                    className="w-full text-[#58534E] text-[14px] py-[12px] rounded-lg bg-white shadow-md"
                    style={{ fontFamily: "Freesentation" }}
                >
                    ← 뒤로가기
                </button>
            </div>
        </div>
    );
};

export default CommunitySearchTab;
