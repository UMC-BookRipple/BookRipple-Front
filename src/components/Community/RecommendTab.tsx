import { useEffect, useRef, useState } from "react";
import RecommendBookCard from "../Card/RecommendBookCard";
import { type RecommendBook } from "../../types/recommendbook";
import { fetchRecommendBooks } from "../../api/Community/recommend";

const RecommendTab = ({ bookId }: { bookId: number }) => {
    const [books, setBooks] = useState<RecommendBook[]>([]);
    const [lastId, setLastId] = useState<number | null>(null);
    const [hasNext, setHasNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const loadRecommendBooks = async () => {
        if (!hasNext || isLoading) return;

        setIsLoading(true);
        try {
            const data = await fetchRecommendBooks({ bookId, lastId });

            if (!data.isSuccess || !data.result) {
                console.error("API 실패:", data);
                setHasNext(false);
                return;
            }

            const { recommendList, lastId: nextLastId, hasNext: nextHasNext } =
                data.result;

            setBooks((prev) => [...prev, ...recommendList]);
            setLastId(nextLastId);
            setHasNext(nextHasNext);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // 최초 로딩
    useEffect(() => {
        loadRecommendBooks();
    }, [bookId]);

    // 무한 스크롤
    useEffect(() => {
        if (!hasNext) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadRecommendBooks();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasNext, lastId]);

    return (
        <div className="flex flex-col gap-[10px] px-[10px] py-[24px] w-full">
            <div className="flex flex-col items-center gap-[10px] w-full">
                {books.map((book) => (
                    <div key={book.id} className="px-[24px] py-[10px] w-full">
                        <RecommendBookCard book={book} />
                    </div>
                ))}
            </div>

            {hasNext && <div ref={loaderRef} className="h-[40px]" />}
        </div>
    );
};

export default RecommendTab;
