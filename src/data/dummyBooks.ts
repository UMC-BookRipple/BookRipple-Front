export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    pageCount: number;
    imageUrl: string;
}

export const dummyBooks: Book[] = [
    {
        id: 1,
        title: "트렌드 코리아 2025",
        author: "김난도",
        publisher: "민음사",
        pageCount: 180,
        imageUrl: "/src/assets/icons/book1.jpg",
    },
    {
        id: 2,
        title: "불편한 편의점 3",
        author: "김호연",
        publisher: "민음사",
        pageCount: 180,
        imageUrl: "/src/assets/icons/book1.jpg",
    },
    {
        id: 3,
        title: "세이노의 가르침",
        author: "세이노",
        publisher: "민음사",
        pageCount: 180,
        imageUrl: "/src/assets/icons/book1.jpg",
    },
];


