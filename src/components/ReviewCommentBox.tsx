
interface ReviewCommentBoxProps {
    content: string
}

const ReviewCommentBox = ({ content }: ReviewCommentBoxProps) => {
    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-[10px] p-[14px] bg-[#FFF] text-[#58534E] rounded-[10px]">
                <span>useName Component</span>

                <p className="text-[16px] font-[Freesentation] font-weight-[400]">
                    {content}
                </p>
            </div>
        </div>
    )
}

export default ReviewCommentBox
