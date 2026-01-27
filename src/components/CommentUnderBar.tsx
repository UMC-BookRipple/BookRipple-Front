import plusIcon from "../../assets/icons/plusIcon.svg"

const CommentUnderBar = () => {
    return (
        <div className="fixed bottom-[30px] left-0 w-full px-[16px]">
            <div className="w-full h-[40px] rounded-[100px] bg-[#FFF] flex items-center px-[10px]">

                {/* 입력 영역 */}
                <input
                    type="text"
                    className="flex-1 h-full bg-transparent outline-none"
                    placeholder="댓글을 입력하세요"
                />

                {/* 버튼 */}
                <button
                    className="ml-[8px] w-[30px] h-[30px] rounded-[100px] bg-[#827A74] flex items-center justify-center shrink-0 fill-[#FFF]">
                    <img src={plusIcon} alt="" />
                </button>
            </div>
        </div>
    )
}

export default CommentUnderBar;
