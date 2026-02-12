export interface BookState {
    bookId: number;          // DB PK
    aladinId: number;
    imageUrl: string;
    title: string;
    author: string;
    publisher: string;
    pageCount: number;
}
