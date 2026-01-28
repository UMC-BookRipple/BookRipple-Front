
import { useEffect, useRef, useState } from "react";
import RecommendBookCard from "../Card/RecommendBookCard";
import { dummyBooks, type Book } from "../../data/dummyBooks";


const RecommendTab = () => {
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // 임시 더미 데이터 개수
    const visibleBooks = dummyBooks.slice(0, page * 3);

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
        <div className="flex flex-col gap-[10px] px-[10px] py-[24px] w-full">

            {/* 리뷰 리스트 */}
            <div className="flex flex-col justify-center items-center gap-[10px] w-full">
                {visibleBooks.map((book: Book) => (
                    <div key={book.id} className="flex
          justify-center
          items-center
          px-[24px]
          py-[10px]
          gap-[10px]
          w-full">


                        <RecommendBookCard book={book} />




                    </div>
                ))}
            </div>

            {/* 무한 스크롤 트리거 */}
            <div ref={loaderRef} className="h-[40px]" />
        </div>
    );
};


export default RecommendTab;
