import ReviewCard from "../Card/ReviewCard";
import { useEffect, useRef, useState } from "react";
import { type Review } from "../../types/review";
import { fetchReviews } from "../../api/Community/review";

const ReviewTab = ({ bookId }: { bookId: number }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [lastId, setLastId] = useState<number | null>(null);
    const [hasNext, setHasNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);


    const loadReviews = async () => {
        if (!hasNext || isLoading) return;

        setIsLoading(true);
        try {
            const data = await fetchReviews({ bookId, lastId });



            const { isSuccess, result } = data;

            if (!isSuccess || !result) {
                setHasNext(false);
                return;
            }

            const newReviews = result.reviewList;

            // 중복된 리뷰는 제외하고 추가
            setReviews((prevReviews) => {
                const filteredReviews = newReviews.filter(
                    (review) => !prevReviews.some((existingReview) => existingReview.id === review.id)
                );

                // 새로운 리뷰가 있으면 추가
                return [...prevReviews, ...filteredReviews];
            });

            setLastId(result.lastId);
            setHasNext(result.hasNext);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // 최초 로딩
    useEffect(() => {
        loadReviews();
    }, [bookId]);

    // 무한 스크롤
    useEffect(() => {
        if (!hasNext || isLoading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadReviews();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasNext, isLoading]);

    return (
        <div className="flex flex-col gap-[10px] px-[10px] py-[16px] w-full">
            <div className="flex flex-col gap-[10px] w-full">
                {reviews.length === 0 && !isLoading && (
                    <div className="text-center text-gray-400 py-8">
                        아직 등록된 리뷰가 없습니다.
                    </div>
                )}
                {reviews.map((review, index) => (
                    <div key={`${review.id}-${index}`} className="w-full flex flex-col gap-[10px]">
                        <ReviewCard review={review} />
                        <div className="w-full py-[10px] flex justify-center">
                            <div className="w-full h-[0.7px] bg-black opacity-30" />
                        </div>
                    </div>
                ))}

            </div>

            {hasNext && <div ref={loaderRef} className="h-[40px]" />}
        </div>
    );
};

export default ReviewTab;
