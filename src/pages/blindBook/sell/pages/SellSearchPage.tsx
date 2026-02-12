import React, { useState, useEffect } from 'react';
import Header from '../../../../components/Header';
import SearchBar from '../../../../components/SearchBar_deleteButton';
import SearchEmpty from '../../../../components/Search/SearchEmpty';
import SearchResult from '../../../../components/Bookshelf/BookshelfSearchResult';
import RecentSearchItem from '../../../../components/RecentSearchItem';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    searchBooks,
    type Book,
    fetchBookSearchHistory,
    type SearchHistoryItem,
    deleteSearchHistoryById,
    deleteAllSearchHistory,
    getBookDetailByAladinId,
} from '../../../../api/books';

export default function SellSearchPage() {
    const [query, setQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
    const [results, setResults] = useState<Book[]>([]);
    // 부모 컴포넌트(SellRegisterPage)와 상태를 공유할 필요가 없으므로 내부 상태로 관리하거나 필요 시 제거
    // BookShelfSearchPage에서는 상위에서 주입받았으나 여기서는 독립 페이지로 동작

    const navigate = useNavigate();
    const location = useLocation();

    // 페이지 로드 시 최근 검색어 불러오기
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
    };

    // Enter → 검색 + 최근 검색어 저장
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            try {
                // 검색 결과 가져오기
                const items = await searchBooks(query, 'BOOK');
                setResults(items);

                // 최신 최근 검색어 갱신
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

        try {
            const items = await searchBooks(keyword, 'BOOK');
            setResults(items);
        } catch (err) {
            console.error('도서 검색 실패:', err);
            setResults([]);
        }
    };

    /* 최근 검색어 개별 삭제 */
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

    /* 전체 삭제 */
    const handleClearAll = async () => {
        try {
            await deleteAllSearchHistory('BOOK');
            setRecentSearches([]);
        } catch (e) {
            console.error('검색 기록 전체 삭제 실패', e);
        }
    };

    /** 핵심: 검색 결과 선택 -> 이전 페이지(등록 페이지)로 데이터 전달하며 이동 */
    const handleSelectBook = async (book: Book) => {
        try {
            // 상세 정보 조회 (필요한 경우)
            const detail = await getBookDetailByAladinId(book.aladinItemId);

            // 등록 페이지로 돌아가며 선택된 책 정보 전달
            // state로 전달하면 useLocation으로 받을 수 있음
            navigate('/blind-book/sell/new', {
                state: {
                    selectedBook: {
                        ...book,
                        // 상세 정보에서 필요한 필드가 있다면 덮어쓰기
                        bookId: detail.bookId,
                        title: detail.title,
                        author: detail.author,
                        imageUrl: detail.coverUrl,
                        publisher: detail.publisher,
                        totalPage: detail.totalPage,
                    },
                    formState: location.state?.formState,
                },
                replace: true // 뒤로가기 시 검색 페이지가 아닌 그 전 페이지로 가도록? 상황에 따라 조정
            });
        } catch (e) {
            console.error('도서 상세 조회 실패', e);
        }
    };

    return (
        <div className="flex h-screen w-full flex-col bg-[#F7F5F1]">
            <Header />

            {/* 검색바 */}
            <div className="w-full">
                <SearchBar
                    placeholder="판매할 도서 제목, 작가명으로 검색하기"
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
                    <SearchResult query={query} onSelect={handleSelectBook} disableAutoNavigate />
                ) : (
                    <SearchEmpty />
                )}
            </div>
        </div>
    );
}
