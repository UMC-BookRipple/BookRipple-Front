import Divider from "./Divider"

const BookTitleLabel = ({ BookTitle }: { BookTitle: string }) => {
    return (
        <div
            className="w-full flex flex-col items-start justify-center">
            <p
                className="text-left px-[4px] pt-[20px] pb-[5px] text-[18px] font-[Freesentation] text-[#58534E] font-weight-[500] whitespace-nowrap">
                {BookTitle}
            </p>
            <div className="w-full py-[10px]">
                <Divider />
            </div>
        </div>
    )
}

export default BookTitleLabel;