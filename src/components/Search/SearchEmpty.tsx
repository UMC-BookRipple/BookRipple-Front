import LeafIcon from "/src/assets/icons/M-empty.svg"

const SearchEmpty = () => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-[10px] min-h-[60vh]">
            <img src={LeafIcon} className="w-[40px] h-[40px]" alt="empty icon" />
            <p
                className="
          text-[18px]
          font-[500]
          leading-normal
          font-[Freesentation]
          text-[var(--black,#58534E)]
        "
            >
                검색 결과가 없습니다
            </p>
        </div>
    )
}

export default SearchEmpty
