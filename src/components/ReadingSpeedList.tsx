import ReadingInform from "./ReadingInform";

const ReadingSpeedList = () => {


    // 확인을 위한  mock 데이터
    const BookInformList = [
        { bookCover: "도서명", bookName: "도서명", bookAuthor: "작가", leftDays: 7 },
        { bookCover: "도서명", bookName: "도서명", bookAuthor: "작가", leftDays: 1 },
        { bookCover: "도서명", bookName: "도서명", bookAuthor: "작가", leftDays: 30 },
    ]
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[5px]">
            {BookInformList.map((bookInform, index) => (
                <ReadingInform key={index} bookCover={bookInform.bookCover} bookName={bookInform.bookName} bookAuthor={bookInform.bookAuthor} leftDays={bookInform.leftDays} readingTime={null} readingPercent={null} />
            ))}
        </div>
    )
}

export default ReadingSpeedList;
