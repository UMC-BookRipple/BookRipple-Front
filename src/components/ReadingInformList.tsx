import ReadingInform from "./ReadingInform";
import type { LibraryBookSummary } from "../api/libraryApi";

interface ReadingInformListProps {
    books: LibraryBookSummary[];
}

const ReadingInformList = ({ books }: ReadingInformListProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[5px]">
            {books.map((book) => (
                <ReadingInform
                    key={book.bookId}
                    bookCover={book.coverUrl}
                    bookName={book.title}
                    bookAuthor={book.authors.join(", ")}
                    readingTime={Math.round(book.readingTimeMinutes / 60)}
                    readingPercent={book.progressPercent}
                    leftDays={null}
                />
            ))}
        </div>
    )
}

export default ReadingInformList;
