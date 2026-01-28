import searchIcon from "/src/assets/icons/M-search.svg";

interface SearchBarSimpleProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  // 이벤트 타입으로 수정
    onFocus?: () => void;
    onClick?: () => void;
}


const SearchBarSimple: React.FC<SearchBarSimpleProps> = ({
    placeholder,
    value,
    onChange,
    onFocus,
    onClick,
}) => {
    return (
        <div className="flex items-center gap-2 w-full px-3 py-2 bg-white rounded-[10px]">
            <img src={searchIcon} alt="Search" className="w-5 h-5" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onClick={onClick}
                className="flex-1 text-[#58534E] text-[16px] font-[Freesentation] outline-none placeholder:text-[#58534E]"
            />
        </div>
    );
};

export default SearchBarSimple;
