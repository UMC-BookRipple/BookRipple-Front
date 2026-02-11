import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import SearchBar from '../../../components/SearchBar_deleteButton'; // 검색바 컴포넌트
import SearchEmpty from '../../../components/Search/SearchEmpty'; // 검색 결과 없을 때
import SearchResult from '../../../components/Bookshelf/BookshelfSearchResult'; // 검색 결과 리스트
import RecentSearchItem from '../../../components/RecentSearchItem';
import { useNavigate } from 'react-router-dom';

import {
  searchBooks,
  type Book,
  fetchBookSearchHistory,
  type SearchHistoryItem,
  deleteSearchHistoryById,
  deleteAllSearchHistory,
} from '../../../api/books';
import { addBookToBookshelf } from '../../../api/bookshelf.api';

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

  // 페이지 로드 시 최근 검색어 불러오기 (book 타입)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const items = await fetchBookSearchHistory();
        setRecentSearches(items);
      } catch (e) {
        console.error('최근 검색어 조회 실패', e);
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
    if (e.key === 'Enter' && query.trim() !== '') {
      setSearchQuery(query);

      try {
        // 검색 결과 가져오기 (book 타입)
        const items = await searchBooks(query, 'BOOK');
        setResults(items);

        // 최신 최근 검색어 갱신 (book 타입)
        const history = await fetchBookSearchHistory();
        setRecentSearches(history);
      } catch (err) {
        console.error('도서 검색 실패:', err);
        setResults([]);
      }
    }
  };

  // 최근 검색어 클릭
  const handleSelectRecent = async (keyword: string) => {
    setQuery(keyword);
    setSearchQuery(keyword);

    try {
      const items = await searchBooks(keyword, 'BOOK');
      setResults(items);
    } catch (err) {
      console.error('도서 검색 실패:', err);
      setResults([]);
    }
  };

  /* 🔹 최근 검색어 개별 삭제 */
  const handleRemoveRecent = async (historyId: number) => {
    try {
      await deleteSearchHistoryById(historyId);
      setRecentSearches((prev) =>
        prev.filter((item) => item.historyId !== historyId),
      );
    } catch (e) {
      console.error('검색 기록 삭제 실패', e);
    }
  };

  /* 🔹 전체 삭제 */
  const handleClearAll = async () => {
    try {
      await deleteAllSearchHistory('BOOK');
      setRecentSearches([]);
    } catch (e) {
      console.error('검색 기록 전체 삭제 실패', e);
    }
  };

  /** 🔹 핵심: 검색 결과 선택 - 책장에 추가 후 책장 페이지로 이동 */
  const handleSelectBook = async (book: Book) => {
    try {
      // 책장에 추가 (진행 중 상태로)
      await addBookToBookshelf(book.aladinItemId);

      // 책장 페이지로 이동
      navigate('/bookshelf');
    } catch (e) {
      console.error('책장 추가 실패', e);
      alert('책을 책장에 추가하는데 실패했습니다.');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#F7F5F1]">
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
      <div className="flex-1 overflow-y-auto px-[16px] py-[10px]">
        {query.trim() === '' ? (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-[Freesentation] text-[14px] text-[#58534E]">
                최근 검색어
              </span>
              {recentSearches.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-[14px] text-[#58534E]"
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
          <SearchResult query={searchQuery} onSelect={handleSelectBook} />
        ) : (
          <SearchEmpty />
        )}
      </div>
    </div>
  );
};

export default RecommendBookSearchPage;
