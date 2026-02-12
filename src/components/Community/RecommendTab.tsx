import { useEffect, useRef, useState } from 'react';
import RecommendBookCard from '../Card/RecommendBookCard';
import { type RecommendBook } from '../../types/recommendbook';
import { fetchRecommendBooks } from '../../api/Community/recommend';

const RecommendTab = ({ bookId }: { bookId: number }) => {
  const [books, setBooks] = useState<RecommendBook[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 추천 책을 불러오는 함수
  const loadRecommendBooks = async () => {
    if (!hasNext || isLoading) return;

    setIsLoading(true);

    try {
      const data = await fetchRecommendBooks({ bookId, lastId });

      // 데이터 확인
      console.log('API Response Data:', data);

      if (!data.isSuccess || !data.result) {
        console.error('API 실패:', data);
        setHasNext(false);
        return;
      }

      const {
        recommendList,
        lastId: nextLastId,
        hasNext: nextHasNext,
      } = data.result || {};

      if (recommendList && recommendList.length > 0) {
        // 중복 처리 후 새 책 목록 추가
        setBooks((prevBooks) => {
          const newBooks = recommendList.filter(
            (book) =>
              !prevBooks.some((existingBook) => existingBook.id === book.id),
          );

          console.log('Existing books:', prevBooks);
          console.log('New books to be added:', newBooks);

          const updatedBooks = [...prevBooks, ...newBooks];
          console.log('Updated books:', updatedBooks);

          return updatedBooks;
        });
      }

      // 상태 업데이트: lastId와 hasNext를 제대로 갱신
      setLastId(nextLastId); // 새로 받은 lastId를 setLastId로 갱신
      setHasNext(nextHasNext); // 새로 받은 hasNext 값을 갱신
    } catch (error) {
      console.error('추천 책 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 최초 로딩
  useEffect(() => {
    loadRecommendBooks();
  }, [bookId]); // bookId가 변경되면 새로 불러오기

  // 무한 스크롤 감지
  useEffect(() => {
    if (!hasNext) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadRecommendBooks(); // 더 많은 책을 불러오기
        }
      },
      { threshold: 1 }, // 요소가 100% 화면에 보일 때 실행
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNext, lastId]); // `hasNext`나 `lastId`가 바뀔 때마다

  // 좋아요 상태 업데이트
  const handleLikeUpdate = (targetBookId: number, liked: boolean) => {
    console.log(`Like status updated for book ${targetBookId}:`, liked);
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.targetBookId === targetBookId ? { ...book, isLiked: liked } : book,
      ),
    );
  };

  return (
    <div className="flex w-full flex-col gap-[10px] px-[10px] py-[24px]">
      <div className="flex w-full flex-col items-center gap-[10px]">
        {/* 추천 도서가 없을 때 */}
        {books.length === 0 && !isLoading && (
          <div className="py-8 text-center text-gray-400">
            아직 등록된 추천도서가 없습니다.
          </div>
        )}
        {books.map((book, index) => (
          <div
            key={`${book.id}-${index}`}
            className="w-full px-[24px] py-[10px]"
          >
            <RecommendBookCard book={book} onLikeUpdate={handleLikeUpdate} />
          </div>
        ))}
      </div>
      {hasNext && <div ref={loaderRef} className="h-[40px]" />}{' '}
      {/* 무한 스크롤 로딩 트리거 */}
    </div>
  );
};

export default RecommendTab;
