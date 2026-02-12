import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { submitRecommendation } from "../../api/Recommend/recommendation";
import { type BookState } from "../../types/bookstate";

const RecommendWritePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // SearchResultCard에서 전달된 state 받기
    const book = location.state as BookState | undefined;

    // 🔽 임시 baseBook 
    const baseBook = {
        id: 12, // ⚠️ 서버에 존재하는 책 ID로 바꿔야 함
        title: "브람스를 좋아하세요...",
    };

    const [content, setContent] = useState("");
    const [loading] = useState(false);

    if (!book) return <div>선택된 도서 정보가 없습니다.</div>;


    const handleSubmit = async () => {
        if (!book) return;

        // book.bookId를 서버 요청 등에서 사용 가능
        console.log("추천 도서 ID:", book.bookId);

        try {
            await submitRecommendation(
                baseBook.id, // 기준 도서 (mock)
                book.bookId,     // 추천 도서 (검색으로 고른 책)
                content
            );




            navigate("/recommend/complete", {
                state: {
                    baseBook,
                    recommendedBook: book,
                    content,
                },
            });

        } catch (err) {
            console.error("추천 저장 실패:", err);
            alert("추천 저장에 실패했습니다.");
        }
    };


    return (
        <div className="flex flex-col h-screen w-full bg-[#F7F5F1]">
            {/* Header */}
            <Header />

            {/* Header 아래 컨테이너 */}
            <div className="flex flex-col px-[14px] pt-[20px] pb-[10px] gap-[10px] w-full">
                {/* 제목 영역 */}
                <div className="flex items-center p-[10px] gap-[10px] w-full border-t border-b border-[#58534E]">
                    <p className="text-[#58534E] font-[Freesentation] text-[16px] font-medium">
                        {baseBook?.title}
                    </p>
                    <p className="text-[#58534E] font-[Freesentation] text-[16px] font-medium">
                        &gt;
                    </p>
                    <p className="text-[#58534E] font-[Freesentation] text-[16px] font-medium">
                        추천도서작성
                    </p>
                </div>
            </div>

            {/* 🔽 선택 도서 카드 영역 */}
            {book && (
                <div
                    className="
          flex flex-col
          px-[16px] pt-[10px] pb-[6px]
          gap-[10px]
          w-full
        "
                >
                    {/* 카드 */}
                    <div
                        className="
            flex
            px-[16px] py-[10px]
            justify-between items-center
            w-full
            rounded-[15px]
            bg-white
          "
                    >
                        {/* 책 이미지 */}
                        <img
                            src={
                                book.imageUrl
                                    ? book.imageUrl.startsWith("http")
                                        ? book.imageUrl
                                        : `http://localhost:8080${book.imageUrl}`
                                    : "/images/default_book.png"
                            }
                            alt={book.title || "책 이미지"}
                            className="w-[92px] h-[131px] rounded-[4px] object-cover"
                        />


                        {/* 제목 / 작가 */}
                        <div className="flex flex-col items-start gap-[4px] flex-1 ml-[12px]">
                            <p className="text-[#58534E] font-[Freesentation] text-[16px] font-medium">
                                {book.title}
                            </p>
                            <p className="text-[#58534E] font-[Freesentation] text-[16px] font-normal">
                                {book.author}
                            </p>
                        </div>

                        {/* 다시 고르기 버튼 영역 */}
                        <div
                            className="
              flex
              w-[88px]
              flex-col
              justify-center
              items-end
              gap-[5px]
            "
                        >
                            <button
                                onClick={() => navigate(-1)}
                                className="
                text-[#58534E]
                text-center
                font-[Freesentation]
                text-[16px]
                font-normal
                underline
              "
                            >
                                추천도서
                                <br />
                                다시고르기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔽 추천 글 작성 영역 */}
            <div
                className="
          flex
          h-[188px]
          px-[16px] pt-[6px] pb-[10px]
          flex-col
          items-start
          gap-[10px]
          w-full
          flex-shrink-0
        "
            >
                {/* 입력 박스 */}
                <div
                    className="
            flex
            px-[16px] py-[14px]
            items-start
            gap-[10px]
            flex-1
            w-full
            rounded-[16px]
            bg-white
          "
                >
                    <textarea
                        placeholder="이 도서를 추천하는 이유를 작성해주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={1}
                        onInput={(e) => {
                            const target = e.currentTarget;
                            target.style.height = "auto";
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        className="
    w-full
    resize-none
    outline-none
    bg-transparent
    overflow-hidden
    text-[#58534E]
    font-[Freesentation]
    text-[16px]
    font-normal
  "
                    />
                </div>
            </div>

            {/* 🔽 화면 맨 아래 고정 버튼 */}
            <div className="w-full fixed bottom-0 left-0 px-[18px] py-[10px] bg-[#F7F5F1]">
                <div className="flex py-[14px] border-t border-[#58534E] justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
              text-[#58534E]
              font-[Freesentation]
              text-[18px]
              font-medium
            "
                    >
                        작성하기
                    </button>
                </div>
            </div>

        </div>
    );
};

export default RecommendWritePage;
