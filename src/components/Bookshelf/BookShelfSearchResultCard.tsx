import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleRegister = () => {
    //  부모로 선택 이벤트 전달 (책장 등록 API 연결용)
    console.log('책장에 추가:', aladinItemId);

    //  토스트 표시
    setShowToast(true);

    //  2초 후 책장 페이지로 이동
    setTimeout(() => {
      setShowToast(false);
      navigate('/bookshelf'); //  책장 페이지 경로 (이 부분 수정 필요)
    }, 2000);
  };

  return (
    <>
      <div className="flex w-full items-center gap-4 rounded-[10px] bg-[#F5F2EC] p-4">
        <img
          src={imageUrl}
          alt={title}
          className="h-[116px] w-[78px] rounded-[4px] object-cover shadow-sm"
        />

        <div className="flex flex-1 flex-col justify-center gap-1 text-[#58534E] min-w-0">
          <p className="text-base leading-tight font-semibold truncate max-w-[140px]">{title}</p>
          <p className="text-sm font-medium truncate max-w-[140px]">{author}</p>
          <p className="text-xs truncate max-w-[140px]">{publisher}</p>
          <p className="text-xs">{pageCount}P</p>
        </div>

        <button
          onClick={handleRegister}
          className="rounded-md bg-[#8A877C] px-4 py-2 text-sm text-white hover:opacity-90 shrink-0"
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
