
interface ReviewCommentBoxProps {
    content: string
}

const ReviewCommentBox = ({ content }: ReviewCommentBoxProps) => {
    return (
        <div className="w-full px-[16px] py-[10px]">
            <div className="w-full flex flex-col p-[14px] bg-[#FFF] text-[#58534E] rounded-[10px] gap-[10px]">
                <span
                    className="flex h-[29px] w-fit items-center justify-center rounded-[20px] bg-[#827A74] px-[10px] py-[5px] text-[#FFFFFF] text-[16x]">
                    {localStorage.getItem("userName")}
                </span>

                <p className="text-[16px] font-[Freesentation] font-weight-[400] px-[4px]">
                    {content}
                </p>
            </div>
        </div>
    )
}

export default ReviewCommentBox
