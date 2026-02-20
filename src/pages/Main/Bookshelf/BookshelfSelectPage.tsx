import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '/src/assets/icons/logo.svg';
import likeIcon from '/src/assets/icons/M-like1.svg';
import likedIcon from '/src/assets/icons/M-like2.svg';

import Header from '../../../components/Header';
import ReadingProgress from '../../../components/ReadingProgress';
import Button from '../../../components/Button';
import BookshelfSection from '../../../components/Bookshelf/BookshelfSection';

import type { BookshelfTabKey, BookItem } from '../../../types/bookshelf.type';
import { isBookshelfTabKey } from '../../../utils/bookshelf.utils';
import {
  fetchBookDetail,
  toggleBookLike,
  fetchBooksByStatus,
} from '../../../api/bookshelf.api';
import type { ApiBookItem } from '../../../types/bookshelf.type';
import { statusToTab } from '../../../types/bookshelf.type';
import { fetchMyBookMemoList, type MemoItem } from '../../../api/memoApi';

const TABS: Array<{ key: BookshelfTabKey; label: string }> = [
  { key: 'reading', label: '진행 중 도서' },
  { key: 'finished', label: '완독 도서' },
  { key: 'liked', label: '좋아요한 도서' },
];

export default function BookshelfSelectPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [book, setBook] = useState<BookItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 독서메모 상태
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const tabParam = params.tab ?? 'reading';
  const tab: BookshelfTabKey = isBookshelfTabKey(tabParam)
    ? tabParam
    : 'reading';
  const bookId = params.bookId ?? '';

  // API에서 책 상세 정보 가져오기
  useEffect(() => {
    const loadBookDetail = async () => {
      if (!bookId) {
        setError('책 ID가 없습니다');
        setIsLoading(false);
        return;
      }

      console.log('🔄 Loading book detail for bookId:', bookId);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchBookDetail(Number(bookId));

        // 좋아요한 책 목록 가져오기 (isLiked 확인용)
        let isLiked = false;
        try {
          const likedResponse = await fetchBooksByStatus({
            status: 'LIKED',
            size: 100,
          });
          const likedBookIds = new Set(
            likedResponse.result.items.map((item: ApiBookItem) => item.bookId),
          );
          isLiked = likedBookIds.has(response.result.bookId);
        } catch (error) {
          console.warn('⚠️ Failed to fetch liked books, isLiked will be false');
        }

        // API 응답을 BookItem 형식으로 변환
        const bookData: BookItem = {
          id: response.result.bookId.toString(),
          title: response.result.title,
          coverUrl: response.result.coverUrl,
          authors: response.result.authors,
          author: response.result.authors[0],
          publisher: response.result.publisher,
          pages: response.result.totalPages,
          isLiked, // 좋아요한 책 목록에서 확인한 값 사용
          status: statusToTab[response.result.status],
          progressPercent: response.result.progressPercent ?? 0, // null/undefined일 경우 0으로 설정
          currentPage: Math.round(
            ((response.result.progressPercent ?? 0) / 100) *
              response.result.totalPages,
          ),
          bookId: response.result.bookId,
        };

        setBook(bookData);
      } catch (err) {
        console.error('❌ Failed to load book detail:', err);
        setError(
          err instanceof Error
            ? err.message
            : '책 정보를 불러오는데 실패했습니다',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadBookDetail();
  }, [bookId]);

  // 메모 목록 불러오기
  const loadMemos = useCallback(async () => {
    if (!bookId) return;
    try {
      const res = await fetchMyBookMemoList(Number(bookId), undefined, 50);
      if (res.isSuccess) {
        setMemos(res.result.items ?? []);
      }
    } catch (e) {
      console.error('메모 목록 조회 실패:', e);
    }
  }, [bookId]);

  // 독서메모 토글 열릴 때 메모 목록 불러오기
  useEffect(() => {
    if (isMemoOpen) {
      void loadMemos();
    }
  }, [isMemoOpen, loadMemos]);

  const handleLikeToggle = async () => {
    if (!book || !book.bookId) return;

    // Optimistic UI update
    const previousLikedState = book.isLiked;
    setBook({ ...book, isLiked: !book.isLiked });

    try {
      await toggleBookLike(book.bookId, previousLikedState);
      console.log('✅ Like toggled successfully');
    } catch (error) {
      console.error('❌ Failed to toggle like:', error);
      // Revert on error
      setBook({ ...book, isLiked: previousLikedState });
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  const handleTabChange = (newTab: BookshelfTabKey) => {
    navigate(`/bookshelf/${newTab}`);
  };

  const handleStartReading = () => {
    if (!book || !book.bookId) return;

    navigate(`/books/${book.bookId}/reading/timer`, {
      state: { resetTimer: true, from: 'BookshelfSelectPage' },
    });
  };

  const handleWriteReview = () => {
    if (!book || !book.bookId) return;

    navigate(`/books/${book.bookId}/review/new`, {
      state: { bookTitle: book.title },
    });
  };

  const handleWriteRecommendations = () => {
    if (!book) return;

    navigate('/recommend/search', {
      state: {
        bookId: book.bookId,
        aladinId: 0,
        title: book.title,
        author: book.author || '',
        imageUrl: book.coverUrl,
        publisher: book.publisher || '',
        pageCount: book.pages || 0,
      },
    });
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F1]">
        <div className="text-[#58534E]/70">로딩 중...</div>
      </div>
    );
  }

  // 에러 발생
  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#F7F5F1] p-6">
        <div className="mb-2 font-semibold text-red-600">오류 발생</div>
        <div className="text-[#58534E]/70">
          {error || '도서를 찾을 수 없습니다'}
        </div>
      </div>
    );
  }

  // 책 정보에서 필요한 값 추출
  const isFinishedView = tab === 'finished' || book.status === 'finished';
  const progress = book.progressPercent ?? 0;
  const pages = book.pages ?? 0;
  const current = book.currentPage ?? 0;
  const pagesLeft = Math.max(0, pages - current);
  // 사용자 설정(로컬스토리지) 또는 기본값: 20 페이지/일
  const pagesPerDay = Number(localStorage.getItem('pagesPerDay')) || 20;
  const estimatedDays =
    pagesLeft === 0
      ? 0
      : Math.max(1, Math.ceil(pagesLeft / (pagesPerDay || 1)));

  return (
    <div className="min-h-screen bg-[#F7F5F1]">
      <Header />

      <div className="mx-auto w-full max-w-[402px] bg-[#F7F5F1]">
        {/* Logo Section */}
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[28px]">
          <img src={logo} alt="BookRipple" className="h-[95.6px] w-[382px]" />
        </section>

        {/* Tabs */}
        <div className="mx-auto w-full max-w-[420px] bg-[#F7F5F1] px-4">
          <div className="flex items-end justify-between border-b border-[#58534E]">
            <nav className="flex">
              {TABS.map((t) => {
                const isActive = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTabChange(t.key)}
                    className={`relative flex h-[40px] items-center justify-center self-stretch px-[10px] py-[8px] font-[Freesentation] text-[16px] leading-normal text-[#58534E] transition-colors ${
                      isActive ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {t.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#58534E]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Book Info Card */}
        <div className="flex justify-center px-[16px] pt-[20px]">
          <div className="relative flex w-full max-w-[370px] gap-[16px]">
            {/* Like Button */}
            <button
              type="button"
              className="absolute top-1 right-0 flex h-[30px] w-[30px] items-center justify-center"
              onClick={handleLikeToggle}
            >
              <img
                src={book.isLiked ? likedIcon : likeIcon}
                alt="좋아요"
                className="h-full w-full"
              />
            </button>
            {/* Book Cover */}
            <div className="h-[210px] w-[140px] shrink-0 overflow-hidden border border-[#D4CEC6] bg-white">
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{
                  background: `url(${book.coverUrl}) lightgray 50% / cover no-repeat`,
                }}
              />
            </div>

            {/* Book Info */}
            <div
              className="flex min-w-0 flex-col items-start justify-between self-stretch pt-[2px] pb-[8px]"
              style={{ maxWidth: '149px' }}
            >
              <div className="flex h-[21px] flex-1 items-center gap-[10px] self-stretch overflow-hidden border-t border-b border-[#58534E] px-0 py-[4px] font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
                <span className="min-w-0 flex-1 truncate">{book.title}</span>
              </div>

              <div className="mt-[12px] w-full overflow-hidden font-[Freesentation] text-[16px] leading-normal font-normal text-[#58534E]">
                {book.author && <div className="truncate">{book.author}</div>}
                {book.publisher && (
                  <div className="truncate">{book.publisher}</div>
                )}
                {!!pages && <div>{pages}P</div>}
              </div>

              <div className="mt-[16px] flex gap-[4px] font-[Freesentation] text-[16px] leading-normal font-normal">
                <span className="flex-[1_0_0] text-[#58534E]">
                  독서율 {progress}%
                </span>
                <span className="text-[#827A74]">
                  {current}/{pages}
                </span>
              </div>

              <div className="mt-[3px]">
                <ReadingProgress
                  progress={progress}
                  className="h-[20px] w-[155px] shrink-0"
                />
              </div>

              <div className="mt-[6px] flex-[1_0_0] font-[Freesentation] text-[14px] leading-normal font-medium text-[#827A74]">
                {progress === 0 ? (
                  <span>독서를 시작해볼까요?</span>
                ) : pagesLeft <= 0 ? (
                  <span>이미 완독한 도서입니다</span>
                ) : (
                  <span>{estimatedDays}일 후 완독 가능</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-[15px] flex flex-col items-center justify-center gap-[10px] self-stretch px-[16px] py-0">
          {isFinishedView ? (
            <>
              <Button variant="secondary" onClick={handleWriteReview}>
                감상평 작성
              </Button>
              <Button variant="secondary" onClick={handleWriteRecommendations}>
                추천 도서 작성
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleStartReading}>
              독서하기
            </Button>
          )}
        </div>

        {/* Detail Sections */}
        <div className="mt-[10px] flex w-full max-w-[402px] flex-col items-start justify-center gap-[3px] px-[14px] py-[10px]">
          {/* 독서메모 - Toggle */}
          <BookshelfSection
            title="독서메모"
            type="toggle"
            isOpen={isMemoOpen}
            onToggle={() => setIsMemoOpen((prev) => !prev)}
          >
            {/* 저장된 메모 목록 */}
            {memos.length === 0 ? (
              <div className="flex w-full items-center justify-center rounded-[10px] bg-white px-[16px] py-[20px]">
                <span className="font-[Freesentation] text-[14px] text-[#A6A29C]">
                  작성된 내용이 없습니다.
                </span>
              </div>
            ) : (
              memos.map((memo) => (
                <div
                  key={memo.memoId}
                  className="flex w-full flex-col gap-[6px] self-stretch rounded-[10px] bg-white px-[16px] py-[10px]"
                >
                  <span className="font-[Freesentation] text-[16px] font-[500] text-[#58534E]">
                    {memo.memoTitle}
                  </span>
                  {memo.page && memo.page !== '0' && (
                    <span className="font-[Freesentation] text-[12px] text-[#A6A29C]">
                      p.{memo.page}
                    </span>
                  )}
                  <p className="font-[Freesentation] text-[14px] leading-snug font-normal text-[#58534E]">
                    {memo.context}
                  </p>
                </div>
              ))
            )}

            {/* 작성하기 버튼 → 메모 목록 페이지로 이동 */}
            <button
              type="button"
              onClick={() =>
                navigate(`/bookshelf/${tab}/select/${bookId}/memos`)
              }
              className="flex w-full items-center gap-[10px] self-stretch rounded-[10px] bg-white px-[12px] py-[14px]"
            >
              <span className="flex-1 text-center font-[Freesentation] text-[16px] leading-normal font-[500] text-[#58534E]">
                작성하기
              </span>
            </button>
          </BookshelfSection>

          {/* 질문답변 - Navigation */}
          <BookshelfSection
            title="질문답변"
            type="navigation"
            onClick={() => {
              // 해당 도서의 커뮤니티(Q&A)로 이동 (QnA 탭)
              navigate(`/community/book/${book.bookId}`, {
                state: { initialTab: 0 },
              });
            }}
          />

          {/* 사람들의 질문 답변 - Navigation */}
          <BookshelfSection
            title="사람들의 질문 답변"
            type="navigation"
            onClick={() => {
              // 해당 도서의 커뮤니티(Q&A)로 이동 (QnA 탭)
              navigate(`/community/book/${book.bookId}`, {
                state: { initialTab: 0 },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
