import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log("책장에 추가:", aladinItemId);

        //  토스트 표시
        setShowToast(true);

        //  2초 후 책장 페이지로 이동
        setTimeout(() => {
            setShowToast(false);
            navigate("/bookshelf"); //  책장 페이지 경로 (이 부분 수정 필요)
        }, 2000);
    };

    return (
        <>
            <div className="flex items-center bg-[#F5F2EC] rounded-[10px] p-4 gap-4 w-full">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-[78px] h-[116px] rounded-[4px] object-cover shadow-sm"
                />

                <div className="flex flex-col flex-1 justify-center gap-1 text-[#58534E]">
                    <p className="font-semibold text-base leading-tight">{title}</p>
                    <p className="text-sm font-medium">{author}</p>
                    <p className="text-xs">{publisher}</p>
                    <p className="text-xs">{pageCount}P</p>
                </div>

                <button
                    onClick={handleRegister}
                    className="bg-[#8A877C] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
                >
                    등록하기
                </button>
            </div>

            {/* 토스트 알림 */}
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
                            책을 책장에 추가했습니다
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookShelfResultCard;
