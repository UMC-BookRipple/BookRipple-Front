interface LibraryBook {
    libraryItemId: number;
    bookId: number;
    title: string;
    coverUrl: string;
    authors: string[];
    status: string;
}
export type { LibraryBook };