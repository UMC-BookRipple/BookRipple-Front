import ReviewCard from "../Card/ReviewCard";
import { useEffect, useRef, useState } from "react";

const ReviewTab = () => {
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // 임시 더미 데이터 개수
    const reviews = Array.from({ length: page * 5 });

    // 무한 스크롤 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-[10px] px-[10px] py-[16px] w-full">

            {/* 리뷰 리스트 */}
            <div className="flex flex-col justify-center items-center gap-[10px] w-full">
                {reviews.map((_, index) => (
                    <div key={index} className="w-full flex flex-col gap-[10px]">

                        {/* 리뷰 카드 */}
                        <ReviewCard />
                        {/* 구분선 영역 */}
                        <div className="w-full py-[10px] flex justify-center">
                            <div className="w-full h-[0.7px] bg-black" />
                        </div>



                    </div>
                ))}
            </div>

            {/* 무한 스크롤 트리거 */}
            <div ref={loaderRef} className="h-[40px]" />
        </div>
    );
};


export default ReviewTab;
