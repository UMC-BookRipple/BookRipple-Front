import searchIcon from "/src/assets/icons/M-search.svg";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "제목, 작가명 검색하기",
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className="flex flex-col w-full px-[16px] py-[10px] gap-[5px] bg-[#F7F5F1] rounded-lg">
      <div className="flex items-center gap-[5px] py-[15px] flex-1 border-b border-[#58534E] w-full">
        <div className="flex flex-col justify-center items-start gap-[10px] p-[10px] rounded-[10px] bg-white w-full">
          <div className="flex items-center gap-[5px] w-full">
            <img src={searchIcon} alt="Search" className="w-5 h-5" />

            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent outline-none text-[16px] text-[#58534E]"
              style={{ fontFamily: "Freesentation" }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center p-[10px]">
          <button
            className="text-[#58534E] text-[16px] font-medium whitespace-nowrap"
            style={{ fontFamily: "Freesentation" }}
            onClick={() => onChange('')}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
