import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SearchBar from "../SearchBar_deleteButton"; // 검색바 컴포넌트
import SearchEmpty from "../Search/SearchEmpty"; // 검색 결과 없을 때
import SearchResult from "../../components/Search/SearchResult";
import RecentSearchItem from "../../components/RecentSearchItem";
// src/api/books.ts
import { searchBooks, type Book } from "../../api/books";
import { useNavigate } from "react-router-dom";


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
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [results, setResults] = useState<Book[]>();
    const navigate = useNavigate();

    const handleSelectBook = (book: Book) => {
        navigate(`/community/book/${book.aladinItemId}`);
    };


    // 페이지 로드 시 최근 검색어 불러오기 (localStorage 사용)
    useEffect(() => {
        const stored = localStorage.getItem("recentSearches");
        if (stored) {
            // 비동기적으로 state 업데이트
            Promise.resolve().then(() => {
                setRecentSearches(JSON.parse(stored));
            });
        }
    }, []);

    // 최근 검색어 삭제
    const handleRemoveRecent = (keyword: string) => {
        const updated = recentSearches.filter((item) => item !== keyword);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    };

    // 최근 검색어 클릭 시 검색 적용
    const handleSelectRecent = async (keyword: string) => {
        setQuery(keyword);
        setSearchQuery(keyword);

        // API 호출
        try {
            const items = await searchBooks(keyword);
            setResults(items);
        } catch (err) {
            console.error("도서 검색 실패:", err);
            setResults([]);
        }
    };

    // 검색어 입력 처리
    const handleChange = (value: string) => {
        setQuery(value);
        setSearchQuery(value); // 부모와 동기화
    }

    // **전체 삭제 기능**
    const handleClearAll = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchQuery(query); // 엔터 시 검색 적용
            if (query.trim() !== "") {
                const updated = [query, ...recentSearches.filter((q) => q !== query)].slice(0, 5);
                setRecentSearches(updated);
                localStorage.setItem("recentSearches", JSON.stringify(updated));

                // API 호출
                try {
                    const items = await searchBooks(query);
                    setResults(items);
                } catch (err) {
                    console.error("도서 검색 실패:", err);
                    setResults([]);
                }
            }
        }
    };



    // 검색 결과 필터링
    /*const results =
        query.trim() === ""
            ? null
            : dummyBooks.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
            );*/

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
                {query.trim() === "" ? (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#58534E] font-[Freesentation] text-[14px]">
                                최근 검색어
                            </span>
                            {recentSearches.length > 0 && (
                                <button
                                    onClick={handleClearAll}
                                    className="text-[#58534E] text-[14px] font-[Freesentation]"
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
                                    onSelect={handleSelectRecent} // 클릭 시 검색 적용
                                    onRemove={handleRemoveRecent} // X버튼 클릭 시 삭제
                                />
                            ))}
                        </div>
                    </div>
                ) : results && results.length > 0 ? (
                    // 검색 결과가 있을 때
                    <SearchResult books={results} query={query} onSelectBook={handleSelectBook} />
                ) : (
                    // 검색 결과가 없을 때
                    <SearchEmpty />
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
