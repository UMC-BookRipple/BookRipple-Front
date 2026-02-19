import Header from '../../components/Header';
import TopBar from '../../components/TopBar2';
import { useState, useEffect } from 'react';
import ReviewTab from '../../components/Community/ReviewTab';
import QnATab from '../../components/Community/QnATab';
import RecommendTab from '../../components/Community/RecommendTab';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getBookDetailByAladinId } from '../../api/books';
import { fetchBookDetail, fetchBooksByStatus } from '../../api/bookshelf.api';

const TABS = ['도서별 질문답변', '도서별 감상평 읽기', '도서별 추천도서'];

// 공통 책 데이터 타입
export interface CommunityBookDetailData {
    bookId: number;
    title: string;
    coverUrl: string;
    publisher: string;
    totalPages: number;
}

// 알라딘 ID 기준으로 내 책장에 등록된 bookId를 찾는 함수
const findLibraryBookIdByAladinId = async (
    aladinItemId: number,
): Promise<number | null> => {
    try {
        const [reading, completed, liked] = await Promise.all([
            fetchBooksByStatus({
                status: 'READING',
                lastId: undefined,
                size: 100,
            }),
            fetchBooksByStatus({
                status: 'COMPLETED',
                lastId: undefined,
                size: 100,
            }),
            fetchBooksByStatus({
                status: 'LIKED',
                lastId: undefined,
                size: 100,
            }),
        ]);

        const matchedBook = [
            ...reading.result.items,
            ...completed.result.items,
            ...liked.result.items,
        ].find((book) => book.aladinItemId === aladinItemId);

        if (matchedBook) {
            return matchedBook.bookId;
        }

        return null; // 책장이 아니면 null 반환
    } catch (error) {
        console.error('책장 확인 실패', error);
        return null;
    }
};

const BookCommunityPage = () => {
    const { bookId: routeBookId } = useParams<{ bookId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [book, setBook] = useState<CommunityBookDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    // location.state에서 initialTab을 가져와서 activeIndex 초기화
    const initialTab =
        (location.state as { initialTab?: number })?.initialTab ?? 0;
    const [activeIndex, setActiveIndex] = useState(initialTab);

    useEffect(() => {
        if (!routeBookId) return;

        const parsedRouteBookId = Number(routeBookId);

        if (Number.isNaN(parsedRouteBookId)) {
            setLoading(false);
            return;
        }
        const fetchBook = async () => {
            try {
                setLoading(true);

                // 1) 경로 파라미터가 library bookId 인지 먼저 확인
                try {
                    const libraryBook = await fetchBookDetail(parsedRouteBookId);
                    setBook({
                        bookId: libraryBook.result.bookId,
                        title: libraryBook.result.title,
                        coverUrl: libraryBook.result.coverUrl,
                        publisher: libraryBook.result.publisher,
                        totalPages: libraryBook.result.totalPages,
                    });
                    return;
                } catch {
                    // 경로 값이 library bookId가 아닐 수 있으므로 아래 fallback 계속 진행
                }

                // 2) 경로 파라미터를 aladinItemId로 간주해 내 책장 mapping 조회
                const mappedLibraryBookId =
                    await findLibraryBookIdByAladinId(parsedRouteBookId);

                if (mappedLibraryBookId) {
                    const libraryBook = await fetchBookDetail(mappedLibraryBookId);
                    setBook({
                        bookId: libraryBook.result.bookId,
                        title: libraryBook.result.title,
                        coverUrl: libraryBook.result.coverUrl,
                        publisher: libraryBook.result.publisher,
                        totalPages: libraryBook.result.totalPages,
                    });
                    return;
                }

                // 3) 책장에 없으면 알라딘 도서 상세로 처리
                const data = await getBookDetailByAladinId(parsedRouteBookId);
                setBook({
                    bookId: data.bookId,
                    title: data.title,
                    coverUrl: data.coverUrl,
                    publisher: data.publisher,
                    totalPages: data.totalPage,
                });
            } catch (e) {
                console.error('책 상세 조회 실패', e);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [routeBookId]);

    return (
        <div className="min-h-screen bg-[#F7F5F1]">
            {/* Header */}
            <Header />

            {/* COMMUNITY 타이틀 영역 */}
            <div className="flex w-full items-center gap-[10px] px-[14px] pt-[30px]">
                <div className="flex flex-1 items-center gap-[10px] px-[5px] py-[10px]">
                    <span
                        className="text-[20px] leading-tight font-[700] text-[#58534E] font-[GmarketSans TTF]"
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
