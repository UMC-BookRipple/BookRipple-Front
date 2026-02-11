import LikeIcon from "../../assets/icons/M-like1.svg";
import LikeActiveIcon from "../../assets/icons/M-like2.svg";
import { useState } from "react";
import { type RecommendBook } from "../../types/recommendbook";
import { toggleLikeBook, cancelLikeBook } from "../../api/Community/bookLike";



interface RecommendBookCardProps {
    book: RecommendBook;
    onLikeUpdate: (bookId: number, liked: boolean) => void;
}

const RecommendBookCard = ({ book, onLikeUpdate }: RecommendBookCardProps) => {
    const [liked, setLiked] = useState(book.isLiked || false);
    const [showToast, setShowToast] = useState(false);

    const handleLikeClick = async () => {
        try {
            let result;
            if (liked) {
                // 좋아요 상태가 true라면, 취소
                result = await cancelLikeBook(book.id); // 좋아요 취소 API 호출
            } else {
                // 좋아요 상태가 false라면, 추가
                result = await toggleLikeBook(book.id); // 좋아요 추가 API 호출
            }


            setLiked(result.liked);
            onLikeUpdate(book.id, result.liked);

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        } catch (error) {
            console.error("좋아요 토글 실패:", error);
        }
    };



    return (
        <div className="flex flex-col justify-center items-center gap-[22px] flex-1 pb-[4px] rounded-[20px] bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)]">

            {/* 상단 프로필 + 닉네임 */}
            <div className="flex w-full items-center gap-[10px] px-[20px] py-[14px] pb-[10px] border-b-[1.5px] border-[#E6E6E6]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#F7F5F1] overflow-hidden flex items-center justify-center">
                    <img
                        src="/icons/round_profile.svg"
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="text-[#58534E] font-[Freesentation] text-[18px] font-medium leading-normal">
                    {book.nickname}
                </p>
            </div>

            {/* 추천 도서 정보 */}
            <div className="flex flex-col justify-center items-center gap-[22px] flex-1 pb-[4px] w-full">
                <div className="flex flex-col justify-center items-center gap-[24px] w-full py-[10px]">

                    {/* 추천 도서 제목 */}
                    <p className="text-[#58534E] text-[18px] font-[500] font-[Freesentation] text-center">
                        {book.sourceBookTitle}를 다 완독한 독자의 추천도서
                    </p>

                    {/* 이미지 + 텍스트 */}
                    <div className="flex flex-col items-center gap-[14px]">

                        {/* 이미지 */}
                        <img
                            src={book.targetBookCover}
                            alt={book.targetBookTitle}
                            className="w-[117px] h-[168px] object-cover rounded-[6px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                        />


                        {/* 제목 + 작가 */}
                        <div className="flex flex-col items-center">
                            <p className="text-[#58534E] text-[18px] font-[500] font-[Freesentation] text-center">
                                {book.targetBookTitle}
                            </p>
                            <p className="text-[#827A74] text-[16px] font-[400] font-[Freesentation]">
                                {book.targetBookAuthor}
                            </p>
                        </div>

                        {/* 추천 텍스트 */}
                        <p className="text-[#827A74] text-[16px] font-[400] font-[Freesentation] text-center">
                            {book.content}
                        </p>
                    </div>
                </div>
            </div>

            {/* 좋아요 버튼 + 텍스트 */}
            <div className="flex justify-end items-center gap-[1px] px-[20px] py-[14px] w-full">
                <button
                    className="flex w-[24px] h-[24px] justify-center items-center"
                    aria-label="좋아요"
                    onClick={handleLikeClick}
                >
                    <img
                        src={liked ? LikeActiveIcon : LikeIcon}
                        alt="like"
                        className="w-[16px] h-[16px]"
                    />
                </button>

                <span className="text-[#827A74] text-[16px] font-[400] font-[Freesentation] leading-normal">
                    좋아요
                </span>
            </div>

            {showToast && (
                <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-50">
                    <div
                        className="
        inline-flex
        
        justify-center
        items-center
        gap-[10px]
        px-[10px]
        py-[4px]
        rounded-[20px]
        bg-[#827A74]
      "
                    >
                        <span
                            className="
          text-white
          text-[14px]
          font-[500]
          font-[Freesentation]
          leading-normal
          whitespace-nowrap
        "
                        >
                            {liked
                                ? "좋아요한 도서를 관심도서에 추가하였습니다"
                                : "관심도서에서 제거하였습니다"}
                        </span>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RecommendBookCard;
