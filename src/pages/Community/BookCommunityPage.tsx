import Header from "../../components/Header";
import TopBar from "../../components/TopBar2";
import { useState, useEffect } from "react";
import ReviewTab from "../../components/Community/ReviewTab";
import QnATab from "../../components/Community/QnATab";
import RecommendTab from "../../components/Community/RecommendTab";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getBookDetailByAladinId, type BookDetail } from "../../api/books";
import { fetchBookDetail, fetchBooksByStatus } from "../../api/bookshelf.api";
import type { BookDetailApiResponse } from "../../types/bookshelf.type";


const TABS = [
    "도서별 질문답변",
    "도서별 감상평 읽기",
    "도서별 추천도서",
];

// 공통 책 데이터 타입
export interface CommunityBookDetailData {
    bookId: number;
    title: string;
    coverUrl: string;
    publisher: string;
    totalPages: number;
}

// 내 책장에 책이 있는지 확인하는 함수
const checkIfBookInLibrary = async (aladinItemId: number): Promise<number | null> => {
    try {
        // 'reading' 상태 또는 'completed' 상태로 내 책장 도서를 조회
        const responseReading = await fetchBooksByStatus({
            status: "READING", // 읽고 있는 책
            lastId: undefined, // 마지막 책 ID는 없으므로 undefined
            size: 20, // 한 번에 가져올 책 개수
        });

        const responseCompleted = await fetchBooksByStatus({
            status: "COMPLETED", // 완료된 책
            lastId: undefined,
            size: 20,
        });

        // 응답 데이터 로그로 확인
        console.log("읽고 있는 책 응답:", responseReading);
        console.log("완료된 책 응답:", responseCompleted);

        // 읽고 있는 책 중에 해당 aladinItemId가 있는지 확인
        const readingBook = responseReading.result.items.find((book) => book.aladinItemId === aladinItemId);
        if (readingBook) return readingBook.bookId; // 'reading' 상태에 있으면 bookId 반환

        // 완료된 책 중에 해당 aladinItemId가 있는지 확인
        const completedBook = responseCompleted.result.items.find((book) => book.aladinItemId === aladinItemId);
        if (completedBook) return completedBook.bookId; // 'completed' 상태에 있으면 bookId 반환

        return null; // 책장이 아니면 null 반환
    } catch (error) {
        console.error("책장 확인 실패", error);
        return null;
    }
};


const BookCommunityPage = () => {
    const { bookId: aladinItemId } = useParams<{ bookId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [book, setBook] = useState<CommunityBookDetailData | null>(null);
    const [progress, setProgress] = useState<number>(0);  // 진행률 상태
    const [loading, setLoading] = useState(true);

    // location.state에서 initialTab을 가져와서 activeIndex 초기화
    const initialTab = (location.state as { initialTab?: number })?.initialTab ?? 0;
    const [activeIndex, setActiveIndex] = useState(initialTab);

    useEffect(() => {
        if (!aladinItemId) return;

        const fetchBook = async () => {
            try {
                setLoading(true);

                // 1. 내 책장에 있는지 확인
                const bookId = await checkIfBookInLibrary(Number(aladinItemId));
                console.log("책이 내 책장에 있는지 확인:", bookId);

                // 2. 내 책장에 책이 있으면 진행률을 가져옴
                if (bookId) {
                    const progressData = await fetchBookDetail(Number(bookId));

                    const progress = progressData.result?.progressPercent ?? 0;
                    console.log("책의 진행률:", progress);

                    setProgress(progress);  // 진행률 업데이트
                    // setBook에 필요한 필드만 포함하여 전달 (bookId, title만)
                    setBook({
                        bookId: progressData.result.bookId,
                        title: progressData.result.title,
                        coverUrl: progressData.result.coverUrl,
                        publisher: progressData.result.publisher,
                        totalPages: progressData.result.totalPages,
                    });
                } else {
                    setProgress(0);  // 책이 없으면 진행률 0으로 설정
                    console.log("책이 내 책장에 없어서 진행률을 0으로 설정");

                    // 3. 책장이 없다면 Aladin API로 책 정보 가져오기
                    const data = await getBookDetailByAladinId(Number(aladinItemId));
                    setBook({
                        bookId: data.bookId,
                        title: data.title,
                        coverUrl: data.coverUrl,
                        publisher: data.publisher,
                        totalPages: data.totalPage,
                    });
                }
            } catch (e) {
                console.error("책 상세 조회 실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [aladinItemId]);


    return (
        <div className="bg-[#F7F5F1] min-h-screen">
            {/* Header */}
            <Header />

            {/* COMMUNITY 타이틀 영역 */}
            <div
                className="
          flex
          w-full
          px-[14px]
          pt-[30px]
          
          items-center
          gap-[10px]
        "
            >
                <div
                    className="
            flex
            px-[5px]
            py-[10px]
            items-center
            gap-[10px]
            flex-1
          "
                >
                    <span
                        className="
              text-[#58534E]
              text-[20px]
              font-[700]
              leading-tight
            "
                        style={{ fontFamily: "Gmarket Sans" }}
                    >
                        COMMUNITY
                    </span>
                </div>
            </div>
            {/* 선택된 책 제목 영역 */}
            <div className="flex w-full px-[20px] py-[10px] items-center gap-2 self-stretch">
                {/* 왼쪽 화살표 버튼 */}
                <button className="p-0 flex-shrink-0"
                    onClick={() => navigate(-1)}>
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
                    className="
            flex-1
            text-[#58534E]
            text-[18px]
            font-[500]
            leading-normal
            truncate
          "
                    style={{ fontFamily: "Freesentation" }}
                >
                    {loading ? "불러오는 중..." : book?.title ?? "책 정보 없음"}

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
