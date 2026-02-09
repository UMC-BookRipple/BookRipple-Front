interface SearchResultCardProps {
    imageUrl: string;
    title: string;
    author: string;
    publisher: string;
    pageCount: number;
    onClick?: () => void;
}

const SearchResultCard = ({
    imageUrl,
    title,
    author,
    publisher,
    pageCount,
    onClick,
}: SearchResultCardProps) => {
    return (
        <div
            className="
              flex p-[5px]
              items-center gap-[10px]
              w-full
              
            "
            onClick={onClick}
        >
            {/* 책 이미지 */}
            <div
                className="w-[78px] h-[116px] rounded-[4px] shadow-sm"
                style={{
                    background: `
                      linear-gradient(180deg, rgba(0,0,0,0.66) 0.25%, rgba(0,0,0,0) 38.58%),
                      url(${imageUrl}) center/cover no-repeat
                    `,
                }}
            />

            {/* 텍스트 영역 */}
            <div className="flex flex-1 flex-col items-start
                  gap-[10px] p-[10px]">
                {/* 제목 */}
                <p className="text-[15px] font-semibold text-[#58534E] line-clamp-2">
                    {title}
                </p>

                {/* 저자 */}
                <p className="text-[13px] font-medium text-[#58534E] opacity-80">
                    {author}
                </p>

                {/* 출판사 */}
                <p className="text-[12px] font-normal text-[#58534E] opacity-70">
                    {publisher}
                </p>

                {/* 페이지 */}
                <p className="text-[12px] font-normal text-[#58534E] opacity-70">
                    {pageCount}p
                </p>
            </div>
        </div>
    );
};

export default SearchResultCard;
