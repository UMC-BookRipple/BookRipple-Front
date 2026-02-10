import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBookToBookshelf } from '../../api/bookshelf.api';

interface BookShelfResultCardProps {
  aladinItemId: number;
  imageUrl: string;
  title: string;
  author: string;
  publisher: string;
  pageCount: number;
  onSelect: (aladinItemId: number) => void;
}

const BookShelfResultCard = ({
  aladinItemId,
  imageUrl,
  title,
  author,
  publisher,
  pageCount,
  onSelect,
}: BookShelfResultCardProps) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleRegister = async () => {
    try {
      // 책장에 추가 API 호출
      await addBookToBookshelf(aladinItemId);

      // 토스트 표시
      setShowToast(true);

      // 2초 후 책장 페이지로 이동
      setTimeout(() => {
        setShowToast(false);
        navigate('/bookshelf/reading');
      }, 2000);
    } catch (error) {
      console.error('책장 추가 실패:', error);
      alert('책을 책장에 추가하는데 실패했습니다.');
    }
  };

  return (
    <>
      <div className="flex w-full items-center gap-3 rounded-[10px] bg-[#F5F2EC] p-4">
        <img
          src={imageUrl}
          alt={title}
          className="h-[116px] w-[78px] flex-shrink-0 rounded-[4px] object-cover shadow-sm"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 text-[#58534E]">
          <p className="truncate text-base leading-tight font-semibold">
            {title}
          </p>
          <p className="truncate text-sm font-medium">{author}</p>
          <p className="truncate text-xs">{publisher}</p>
          <p className="text-xs">{pageCount}P</p>
        </div>

        <button
          onClick={handleRegister}
          className="flex-shrink-0 rounded-md bg-[#8A877C] px-4 py-2 text-sm text-white hover:opacity-90"
        >
          등록하기
        </button>
      </div>

      {/* 토스트 알림 */}
      {showToast && (
        <div className="fixed bottom-[80px] left-1/2 z-50 -translate-x-1/2">
          <div className="inline-flex items-center justify-center gap-[10px] rounded-[20px] bg-[#827A74] px-[10px] py-[4px]">
            <span className="font-[Freesentation] text-[14px] leading-normal font-[500] whitespace-nowrap text-white">
              책을 책장에 추가했습니다
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BookShelfResultCard;
