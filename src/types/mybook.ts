interface LibraryBook {
    libraryItemId: number;
    bookId: number;
    title: string;
    coverUrl: string;
    authors: string[];
    status: string;
    aladinItemId?: number;
}
export type { LibraryBook };