import React, { useEffect, useState } from 'react';
import BookShelfResultCard from './BookShelfSearchResultCard'; // 카드만 변경
import { searchBooks, type Book } from '../../api/books';

interface BookShelfSearchResultProps {
  query: string; // 검색어
  onSelect?: (book: Book) => void; // 선택된 책 전달
}

const BookShelfSearchResult: React.FC<BookShelfSearchResultProps> = ({
  query,
  onSelect,
}) => {
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
        const items = await searchBooks(query, 'BOOK');
        setResults(items);
      } catch (err) {
        console.error('도서 검색 실패:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* 검색 결과 개수 */}
      <div className="flex w-full items-center justify-between px-[16px] py-[5px] font-[Freesentation] text-[14px] font-medium text-[#58534E]">
        총 {results.length}건의 검색 결과가 있습니다.
      </div>

      {/* 검색 결과 카드 리스트 */}
      <div className="flex flex-col gap-4 px-[16px] py-[10px]">
        {loading ? (
          <div className="font-[Freesentation] text-[14px] text-[#58534E]">
            검색 중...
          </div>
        ) : results.length > 0 ? (
          results.map((book) => (
            <BookShelfResultCard
              key={book.aladinItemId}
              aladinItemId={book.aladinItemId}
              imageUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              publisher={book.publisher}
              pageCount={0}
              onSelect={() => onSelect?.(book)}
            />
          ))
        ) : (
          <div className="font-[Freesentation] text-[14px] text-[#58534E]">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookShelfSearchResult;
