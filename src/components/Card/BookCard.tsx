interface BookCardProps {
    title: string;
    imgSrc: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, imgSrc }) => {
    return (
        <div className="flex flex-col items-start gap-[5px] w-[100px] flex-shrink-0">
            {/* 이미지 */}
            <div
                className="w-[98px] h-[150px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)] bg-center bg-cover"
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundColor: "lightgray",
                }}
            ></div>

            {/* 책 제목 */}
            <p
                className="text-[#58534E] text-[14px] font-[500] leading-normal"
                style={{ fontFamily: "Freesentation" }}
            >
                {title}
            </p>
        </div>
    );
};

export default BookCard;
