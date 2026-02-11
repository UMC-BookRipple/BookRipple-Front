import React from "react";
import SearchResultCard from "./SearchResultCard"; // 카드 컴포넌트
import { type Book } from "../../api/books";

interface SearchResultProps {
    books: Book[];
    query: string; // query를 props로 받음
    onSelectBook: (book: Book) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ books, onSelectBook, }) => {


    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            {/* 검색 결과 개수 */}
            <div
                className="flex items-center justify-between px-[20px] py-[5px] text-[#58534E] font-[Freesentation] text-[14px] font-medium w-full"
            >
                총 {books.length}건의 검색 결과가 있습니다.
            </div>

            {/* 검색된 도서 카드 */}
            <div className="flex flex-wrap gap-4 px-[20px] py-[10px]">
                {books.map((book) => (
                    <SearchResultCard
                        key={book.aladinItemId}
                        imageUrl={book.coverUrl}
                        title={book.title}
                        author={book.author}
                        publisher={book.publisher}
                        pageCount={0} // 페이지 수 정보가 없으므로 0으로 설정
                        onClick={() => onSelectBook(book)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchResult;
