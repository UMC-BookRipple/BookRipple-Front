import turtleIcon from "../assets/icons/turtleIcon.svg?url"
import rabbitIcon from "../assets/icons/rabbitIcon.svg?url"

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
            className="w-full h-[85px] flex flex-row items-center bg-[#FFF] rounded-[20px] py-[10px] px-[16px]">
            {/* 책 커버 */}
            <div className="shrink-0">
                <img src={bookCover} alt={`${bookName}의 커버`} className="w-[60px] h-[60px] object-cover rounded-[4px]" />
            </div>
            {/* 책 정보 */}
            <div
                className="flex-1 min-w-0 max-w-[130px] flex flex-col items-start gap-[0px] font-[Freesentation] text-[16px] text-[#58534E] ml-[18px]">
                <span className="font-medium w-full truncate">{bookName}</span>
                <span className="font-medium w-full truncate">{bookAuthor}</span>
            </div>
            {/* 읽은 시간 비율 */}

            {readingTime != null && readingPercent != null && (
                <div className="shrink-0 ml-auto flex flex-row gap-[5px] text-[16px] text-[#58534E] whitespace-nowrap">
                    <span>{readingTime}h</span>
                    <span>{readingPercent}%</span>
                </div>
            )}

            {leftDays != null && leftDays < 7 && (
                <div className="shrink-0 ml-auto flex flex-col items-center gap-[2px] text-[14px] text-[#58534E] whitespace-nowrap">
                    <img src={rabbitIcon} alt="토끼" className="w-[36px] h-[25px]" />
                    <span>{leftDays}일 후 완독 가능</span>
                </div>
            )}

            {leftDays != null && leftDays >= 7 && (
                <div className="shrink-0 ml-auto flex flex-col items-center gap-[2px] text-[14px] text-[#58534E] whitespace-nowrap">
                    <img src={turtleIcon} alt="거북이" className="w-[36px] h-[24px]" />
                    <span>{leftDays}일 후 완독 가능</span>
                </div>
            )}

            {leftDays == null && readingTime == null && readingPercent == null && (
                <div className="shrink-0 ml-auto mr-[10px] flex flex-col items-center gap-[2px] text-[14px] text-[#58534E] whitespace-nowrap">
                    <img src={turtleIcon} alt="거북이" className="w-[36px] h-[24px]" />
                    <span>예측 불가</span>
                </div>
            )}
        </div>
    )
}

export default ReadingInform;
