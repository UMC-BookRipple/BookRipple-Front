import Header from '../../components/Header';
import TopBar from '../../components/TopBar2';
import { useState, useEffect } from 'react';
import ReviewTab from '../../components/Community/ReviewTab';
import QnATab from '../../components/Community/QnATab';
import RecommendTab from '../../components/Community/RecommendTab';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  getBookDetailByAladinId,
  getBookDetailByBookId,
  type BookDetail,
} from '../../api/books';

const TABS = ['도서별 질문답변', '도서별 감상평 읽기', '도서별 추천도서'];

const BookCommunityPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // location.state에서 initialTab을 가져와서 activeIndex 초기화
  const initialTab =
    (location.state as { initialTab?: number })?.initialTab ?? 0;
  const [activeIndex, setActiveIndex] = useState(initialTab);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        setLoading(true);
        // 먼저 aladinItemId로 시도
        try {
          const data = await getBookDetailByAladinId(Number(bookId));
          setBook(data);
          return;
        } catch (e) {
          // aladin 조회 실패하면 내부 bookId로 시도
        }

        const data2 = await getBookDetailByBookId(Number(bookId));
        setBook(data2);
      } catch (e) {
        console.error('책 상세 조회 실패', e);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  return (
    <div className="min-h-screen bg-[#F7F5F1]">
      {/* Header */}
      <Header />

      {/* COMMUNITY 타이틀 영역 */}
      <div className="flex w-full items-center gap-[10px] px-[14px] pt-[30px]">
        <div className="flex flex-1 items-center gap-[10px] px-[5px] py-[10px]">
          <span
            className="text-[20px] leading-tight font-[700] text-[#58534E]"
            style={{ fontFamily: 'Gmarket Sans' }}
          >
            COMMUNITY
          </span>
        </div>
      </div>
      {/* 선택된 책 제목 영역 */}
      <div className="flex w-full items-center gap-2 self-stretch px-[20px] py-[10px]">
        {/* 왼쪽 화살표 버튼 */}
        <button className="flex-shrink-0 p-0" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 8 15"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M0.5 14.5L7.5 7.5L0.5 0.5"
              stroke="#58534E"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 책 제목 텍스트 */}
        <p
          className="flex-1 truncate text-[18px] leading-normal font-[500] text-[#58534E]"
          style={{ fontFamily: 'Freesentation' }}
        >
          {loading ? '불러오는 중...' : (book?.title ?? '책 정보 없음')}
        </p>
      </div>
      <div className="sticky top-0 z-10">
        <TopBar
          mainButtons={TABS}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {!loading && book && activeIndex === 0 && (
          <QnATab bookId={book.bookId} />
        )}

        {!loading && book && activeIndex === 1 && (
          <ReviewTab bookId={book.bookId} />
        )}

        {!loading && book && activeIndex === 2 && (
          <RecommendTab bookId={book.bookId} />
        )}
      </div>
    </div>
  );
};

export default BookCommunityPage;
