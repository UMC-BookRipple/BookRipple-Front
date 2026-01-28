import Divider from "./Divider"

const BookTitleLabel = ({ BookTitle }: { BookTitle: string }) => {
    return (
        <div
            className="w-full flex flex-col items-start justify-center">
            <p
                className="text-left px-[20px] pt-[20px] pb-[5px] text-[18px] font-[Freesentation] text-[#58534E] font-weight-[500]">
                {BookTitle}
            </p>
            <div className="w-full px-[16px] py-[10px]">
                <Divider />
            </div>
        </div>
    )
}

export default BookTitleLabel;