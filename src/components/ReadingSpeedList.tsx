import ReadingInform from "./ReadingInform";
import type { LibraryBookSummary } from "../api/libraryApi";

interface ReadingSpeedListProps {
    books: LibraryBookSummary[];
}

const ReadingSpeedList = ({ books }: ReadingSpeedListProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[5px]">
            {books.map((book) => (
                <ReadingInform
                    key={book.bookId}
                    bookCover={book.coverUrl}
                    bookName={book.title}
                    bookAuthor={book.authors.join(", ")}
                    leftDays={book.estimatedDaysToCompletion}
                    readingTime={null}
                    readingPercent={null}
                />
            ))}
        </div>
    )
}

export default ReadingSpeedList;
