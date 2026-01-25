import searchIcon from "/src/assets/icons/M-search.svg";

const SearchBar = () => {
  return (
    <div className="flex flex-col w-full p-[10px_16px] gap-[5px] bg-[#F7F5F1] rounded-lg">
      {/* 내부 컨테이너: 상하 패딩 + flex + 보더 */}
      <div className="flex items-center gap-[5px] py-[15px] flex-1 border-b border-[#58534E] w-full">
        {/* 흰색 검색창 박스 */}
        <div className="flex flex-col justify-center items-start gap-[10px] p-[10px] rounded-[10px] bg-white w-full">
          {/* 검색 input 영역 */}
          <div className="flex items-center gap-[5px] w-full">
  <button
    type="button"
    onClick={() => console.log("Search icon clicked!")}
    className="flex items-center justify-center"
  >
    <img src={searchIcon} alt="Search" className="w-5 h-5" />
  </button>

            <input
  type="text"
  placeholder="제목, 작가명 검색하기"
  className="flex-1 bg-transparent outline-none text-[16px] font-normal leading-normal text-[#58534E]"
  style={{ fontFamily: 'Freesentation' }}
/>
          </div>
        </div>

        {/* 취소 버튼 영역 (흰색 박스 외부) */}
<div className="flex justify-center items-center p-[10px]">
  <button
    className="text-[#58534E] text-[16px] font-medium leading-normal whitespace-nowrap"
    style={{ fontFamily: 'Freesentation' }}
  >
    취소
  </button>
</div>
      </div>
    </div>
  );
};

export default SearchBar;
