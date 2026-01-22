type Props = {
    keyword: string;
    onSelect: (keyword: string) => void;
    onRemove: (keyword: string) => void;
};

const RecentSearchItem = ({
    keyword,
    onSelect,
    onRemove,
}: Props) => {
    return (
        <div
            className="flex flex-row border border-[0.7px] border-[#58534E] text-[#58534E] py-[6px] px-[10px] w-[98px] h-[26px] items-center justify-between rounded-[5px] text-[12px] font-[Freesentation] font-regular whitespace-nowrap">
            <button
                type="button"
                onClick={() => onSelect(keyword)}
                className="flex items-center"
            >
                {keyword}
            </button>

            <button
                type="button"
                aria-label="검색어 삭제"
                onClick={() => onRemove(keyword)}
                className="text-[#58534E]"
            >
                ✕
            </button>
        </div>
    );
};

export default RecentSearchItem;
