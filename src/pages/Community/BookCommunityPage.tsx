import Header from "../../components/Header";
import TopBar from "../../components/TopBar2";
import { useState } from "react";
import ReviewTab from "../../components/Community/ReviewTab";
import QnATab from "../../components/Community/QnATab";
import RecommendTab from "../../components/Community/RecommendTab";
import { useNavigate, useLocation } from "react-router-dom";
import { type Book, dummyBooks } from "../../data/dummyBooks";
import { useParams } from "react-router-dom";



const TABS = [
    "도서별 질문답변",
    "도서별 감상평 읽기",
    "도서별 추천도서",
];

const BookCommunityPage = () => {
    // 임시 선택된 책 제목 (나중에 API / state로 교체)
    const { bookId } = useParams();
    const location = useLocation();
    const bookFromState = location.state?.book as Book | undefined;

    const book =
        bookFromState ??
        dummyBooks.find((b) => String(b.id) === bookId);

    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(1);


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
                    {book?.title}
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

                {activeIndex === 0 && <QnATab
                />}
                {activeIndex === 1 && <ReviewTab />}
                {activeIndex === 2 && <RecommendTab />}

            </div>
        </div>
    );
};

export default BookCommunityPage;
