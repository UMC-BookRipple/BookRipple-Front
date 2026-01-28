import { useNavigate } from "react-router-dom";

interface SearchResultCardProps {
    imageUrl: string;
    title: string;
    author: string;
    publisher: string;
    pageCount: number;
}

const SearchResultCard = ({
    imageUrl,
    title,
    author,
    publisher,
    pageCount,
}: SearchResultCardProps) => {
    const navigate = useNavigate();

    const handleSelect = () => {
        navigate("/recommend/write", {
            state: {
                imageUrl,
                title,
                author,
                publisher,
                pageCount,
            },
        });
    };

    return (
        <div
            className="
        flex items-center
        bg-[#F5F2EC] rounded-[10px]
        p-4 gap-4
        w-full 
      "
        >
            {/* 책 이미지 */}
            <img
                src={imageUrl}
                alt={title}
                className="w-[78px] h-[116px] rounded-[4px] object-cover shadow-sm"
            />

            {/* 텍스트 영역 */}
            <div className="flex flex-col flex-1 justify-center gap-1 text-[#58534E]">
                <p className="font-semibold text-base leading-tight">{title}</p>
                <p className="text-sm font-medium">{author}</p>
                <p className="text-xs">{publisher}</p>
                <p className="text-xs">{pageCount}P</p>
            </div>

            {/* 선택하기 버튼 */}
            <button
                onClick={handleSelect}
                className="
          bg-[#8A877C] text-white
          rounded-md
          px-4 py-2
          text-sm font-normal
          hover:opacity-90
          transition-opacity duration-200
        "
            >
                선택하기
            </button>
        </div>
    );
};

export default SearchResultCard;
