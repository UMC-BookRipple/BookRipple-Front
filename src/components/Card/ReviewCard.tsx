import { useState } from "react";

interface ReviewData {
    nickname: string;
    content: string;
}

const ReviewCard = () => {
    // 디자인 확인용 더미 데이터
    const [reviewData] = useState<ReviewData>({
        nickname: "익명의 사용자 0322",
        content: "설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다. 누군가를 좋아하지만 쉽게 다가가지 못하는 마음, 말로 꺼내기 전까지 계속 마음속에 머무는 감정들이 자연스럽게 떠오른다.읽는 동안 따뜻함과 쓸쓸함이 함께 느껴지고, 지나간 관계나 놓쳐버린 순간들을 조용히 떠올리게 된다. 감정이 크게 요동치기보다는 낮은 온도로 오래 유지되는 느낌이라, 책을 덮은 뒤에도 여운이 쉽게 사라지지 않는다",
    });

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
                        {reviewData.nickname}
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
                {reviewData.content}
            </p>
        </div>
    );
};

export default ReviewCard;
