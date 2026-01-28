import { type Book } from "../../data/dummyBooks";
import LikeIcon from "../../assets/icons/M-like1.svg";
import LikeActiveIcon from "../../assets/icons/M-like2.svg";
import { useState } from "react";

interface RecommendBookCardProps {
    book: Book;
}

const RecommendBookCard = ({ book }: RecommendBookCardProps) => {
    const [liked, setLiked] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleLikeClick = () => {
        setLiked(true);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2000);
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
                    닉네임 자리 (API 연결 예정)
                </p>
            </div>

            {/* 추천 도서 정보 */}
            <div className="flex flex-col justify-center items-center gap-[22px] flex-1 pb-[4px] w-full">
                <div className="flex flex-col justify-center items-center gap-[24px] w-full py-[10px]">

                    {/* 추천 도서 제목 */}
                    <p className="text-[#58534E] text-[18px] font-[500] font-[Freesentation] text-center">
                        추천 도서 제목 (추후 데이터)
                    </p>

                    {/* 이미지 + 텍스트 */}
                    <div className="flex flex-col items-center gap-[14px]">

                        {/* 이미지 */}
                        <div
                            className="
                w-[117px]
                h-[168px]
                aspect-[39/56]
                bg-gray-200
                bg-center
                bg-cover
                bg-no-repeat
                shadow-[0_2px_4px_rgba(0,0,0,0.25)]
                rounded-[6px]
              "
                            style={{ backgroundImage: `url(${book.imageUrl})` }}
                        />

                        {/* 제목 + 작가 */}
                        <div className="flex flex-col items-center">
                            <p className="text-[#58534E] text-[18px] font-[500] font-[Freesentation] text-center">
                                {book.title}
                            </p>
                            <p className="text-[#827A74] text-[16px] font-[400] font-[Freesentation]">
                                {book.author}
                            </p>
                        </div>

                        {/* 추천 텍스트 */}
                        <p className="text-[#827A74] text-[16px] font-[400] font-[Freesentation] text-center">
                            추천 내용 (추후 데이터 연결)
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
                            좋아요한 도서를 관심도서에 추가하였습니다
                        </span>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RecommendBookCard;
