import Header from "../../components/Header";
import RecommendBookCardNoLike from "../../components/Card/RecommendCardNoLike";
import { useLocation, useNavigate } from "react-router-dom";

export interface RecommendCompleteState {
    book: {
        id: number;
        imageUrl: string;
        title: string;
        author: string;
        publisher: string;
    };
    recommendationId?: number; // 나중에 API 성공 시
}


const RecommendCompletePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { baseBook, recommendedBook, content } = location.state || {};

    if (!baseBook || !recommendedBook) {
        return <div>잘못된 접근입니다.</div>;
    }

    const cardData = {
        id: recommendedBook.id,
        imageUrl: recommendedBook.imageUrl,
        title: recommendedBook.title,
        author: recommendedBook.author,
        recommendationContent: content,
        recommenderName: "닉네임", // 추후 API
        baseBookTitle: baseBook.title,
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#F7F5F1]">
            {/* 상단 영역: 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center w-full">
                {/* Header */}
                <Header />

                {/* Header와 카드 사이 40px 공간 */}
                <div className="h-[40px]" />

                {/* 카드 */}
                <RecommendBookCardNoLike book={cardData} />


            </div>

            {/* 버튼: 화면 맨 아래, 버튼 아래 40px 공간 */}
            <div className="flex flex-col w-full mt-auto px-[16px] py-[10px]">
                {/* 버튼 위 라인 */}
                <div className="w-full h-[0.7px] bg-[#BDB7B2] opacity-70" />
                <div className="h-[10px]" />

            </div>

            <div className="flex flex-col w-full mt-auto px-[16px]">
                <button
                    onClick={() => navigate("/bookshelf")}
                    className="flex w-full px-[10px] py-[16px] justify-center items-center gap-[10px] rounded-[100px] bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.25)] text-[#58534E] font-[Freesentation] text-[18px] font-[500] leading-normal">
                    책장으로 가기
                </button>
            </div>

            <div className="h-[40px]" />
        </div>
    );
};

export default RecommendCompletePage;
