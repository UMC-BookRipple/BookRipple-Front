import { type Review } from "../../types/review";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {


    return (
        <div
            className="
        flex flex-col items-center gap-[10px]
        w-full p-[14px]
        rounded-[10px] bg-white
      "
        >
            {/* 상단 row */}
            <div className="flex w-full justify-between items-center">

                {/* 닉네임 태그 */}
                <div
                    className="
            flex items-center justify-center
            px-[10px] py-[5px] gap-[10px]
            rounded-[20px] bg-[#827A74]
          "
                >
                    <span
                        className="
              text-white 
              text-[16px]
              font-[400] leading-normal
            "
                    >
                        {review.nickname}
                    </span>
                </div>
            </div>

            {/* 리뷰 내용 */}
            <p
                className="
    w-full
    text-[16px]
    font-[400]
    text-[#58534E]
  "
                style={{
                    fontFamily: "Freesentation",
                    lineHeight: "normal",
                }}
            >
                {review.content}
            </p>
        </div>
    );
};

export default ReviewCard;
