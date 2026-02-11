interface RecommendResultCardProps {
    aladinItemId: number;
    imageUrl: string;
    title: string;
    author: string;
    publisher: string;
    pageCount: number;
    onSelect: (aladinItemId: number) => void;
}

const RecommendResultCard = ({
    aladinItemId,
    imageUrl,
    title,
    author,
    publisher,
    pageCount,
    onSelect,
}: RecommendResultCardProps) => {
    return (
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
                onClick={() => onSelect(aladinItemId)}
                className="bg-[#8A877C] text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
            >
                선택하기
            </button>
        </div>
    );
};

export default RecommendResultCard;
