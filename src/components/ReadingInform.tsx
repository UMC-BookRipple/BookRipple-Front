import rabbitIcon from "../../assets/icons/rabbitIcon.svg"
import turtleIcon from "../../assets/icons/turtleIcon.svg"

interface ReadingInformProps {
    bookCover: string;
    bookName: string;
    bookAuthor: string;
    readingTime: number | null;
    readingPercent: number | null;
    leftDays: number | null;
}

const ReadingInform = ({ bookCover, bookName, bookAuthor, readingTime, readingPercent, leftDays }: ReadingInformProps) => {

    return (
        <div
            className="w-full h-[73px] flex flex-row items-center bg-[#FFF] rounded-[20px] py-[10px] px-[16px]">
            {/* 책 커버 */}
            <div>
                <img src={bookCover} alt={`${bookName}의 커버`} />
            </div>
            {/* 책 정보 */}
            <div
                className="w-full flex flex-col items-center gap-[5px] font-[Freesentation] text-[16px] text-[#58534E] whitespace-nowrap ml-[18px]">
                <span className="font-weight-[500]">{bookName}</span>
                <span className="font-weight-[400]">{bookAuthor}</span>
            </div>
            {/* 읽은 시간 비율 */}

            {readingTime && readingPercent && (
                <div
                    className="w-full flex flex-row justify-end gap-[5px] font-[Freesentation] text-[16px] text-[#58534E]  whitespace-nowrap ml-5">
                    <span>{readingTime}h</span>
                    <span>{readingPercent}%</span>
                </div>
            )}

            {leftDays && leftDays < 7 && (
                <div className="w-full flex flex-col justify-center items-end gap-[2px] font-[Freesentation] text-[14px] text-[#58534E] whitespace-nowrap ml-5">
                    <img src={rabbitIcon} alt="" className="w-6 h-6" />
                    <span>{leftDays}일 후 완독 가능</span>
                </div>
            )}

            {leftDays && leftDays >= 7 && (
                <div className="w-full flex flex-col justify-center items-end gap-[2px] font-[Freesentation] text-[14px] text-[#58534E] whitespace-nowrap ml-5">
                    <img src={turtleIcon} alt="" className="w-6 h-6" />
                    <span>{leftDays}일 후 완독 가능</span>
                </div>
            )}


        </div>
    )
}

export default ReadingInform;