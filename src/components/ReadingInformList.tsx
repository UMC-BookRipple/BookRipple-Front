import ReadingInform from "./ReadingInform";

const ReadingInformList = () => {

    const BookInformList = [
        { bookCover: "도서명", bookName: "도서명", bookAuthor: "작가", readingTime: 100, readingPercent: 100 },
        { bookCover: "도서명", bookName: "도서명", bookAuthor: "작가", readingTime: 100, readingPercent: 100 },
        { bookCover: "도서명", bookName: "도서명", bookAuthor: "작가", readingTime: 100, readingPercent: 100 },
    ]
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[5px]">
            {BookInformList.map((bookInform, index) => (
                <ReadingInform key={index} bookCover={bookInform.bookCover} bookName={bookInform.bookName} bookAuthor={bookInform.bookAuthor} readingTime={bookInform.readingTime} readingPercent={bookInform.readingPercent} leftDays={null} />
            ))}
        </div>
    )
}

export default ReadingInformList;
