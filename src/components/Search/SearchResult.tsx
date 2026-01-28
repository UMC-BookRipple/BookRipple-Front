import React from "react";
import { dummyBooks } from "../../data/dummyBooks"; // 더미 데이터 (도서)
import SearchResultCard from "./SearchResultCard"; // 카드 컴포넌트

interface SearchResultProps {
    query: string; // query를 props로 받음
}

const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
    // 검색어를 기준으로 필터링된 도서 목록
    const results = dummyBooks.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            {/* 검색 결과 개수 */}
            <div
                className="flex items-center justify-between px-[20px] py-[5px] text-[#58534E] font-[Freesentation] text-[14px] font-medium w-full"
            >
                총 {results.length}건의 검색 결과가 있습니다.
            </div>

            {/* 검색된 도서 카드 */}
            <div className="flex flex-wrap gap-4 px-[20px] py-[10px]">
                {results.map((book) => (
                    <SearchResultCard
                        key={book.id}
                        imageUrl={book.imageUrl}
                        title={book.title}
                        author={book.author}
                        publisher={book.publisher}
                        pageCount={book.pageCount}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchResult;
