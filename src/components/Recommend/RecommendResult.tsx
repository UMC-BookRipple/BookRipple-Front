import React, { useEffect, useState } from "react";
import RecommendResultCard from "./RecommendResultCard"; // 변경된 카드 컴포넌트
import { searchBooks, type Book } from "../../api/books";

interface SearchResultProps {
  query: string; // 검색어를 props로 받음
  onSelect?: (book: Book) => void; // 선택된 책 정보를 부모로 전달
}

const SearchResult: React.FC<SearchResultProps> = ({ query, onSelect }) => {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const items = await searchBooks(query, "BOOK"); // BOOK 타입
        setResults(items);
      } catch (err) {
        console.error("도서 검색 실패:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {/* 검색 결과 개수 */}
      <div
        className="flex items-center justify-between px-[20px] py-[5px] text-[#58534E] font-[Freesentation] text-[14px] font-medium w-full"
      >
        총 {results.length}건의 검색 결과가 있습니다.
      </div>

      {/* 검색된 도서 카드 리스트 */}
      <div className="flex flex-wrap gap-4 px-[20px] py-[10px]">
        {loading ? (
          <div className="text-[#58534E] font-[Freesentation] text-[14px]">
            검색 중...
          </div>
        ) : results.length > 0 ? (
          results.map((book) => (
            <RecommendResultCard
              key={book.aladinItemId}
              aladinItemId={book.aladinItemId}
              imageUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              publisher={book.publisher}
              pageCount={0}
              onSelect={() => onSelect?.(book)} // 카드 내부 클릭 시 부모로 전달
            />

          ))
        ) : (
          <div className="text-[#58534E] font-[Freesentation] text-[14px]">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchResult;
