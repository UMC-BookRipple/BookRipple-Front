// src/api/books.ts
import api from "./axios"; // 아까 만든 axios instance

export interface Book {
    aladinItemId: number;
    title: string;
    author: string;
    publisher: string;
    coverUrl: string;
    pubDate: string;
    isbn10: string;
    isbn13: string;
}

export interface SearchResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        totalResults: number;
        startIndex: number;
        itemsPerPage: number;
        hasNext: boolean;
        items: Book[];
    };
}

export interface BookDetail {
    bookId: number;
    aladinItemId: number;
    title: string;
    author: string;
    publisher: string;
    coverUrl: string;
    isbn10: string;
    isbn13: string;
    publishedAt: string;
    totalPage: number;
    story: string;
}

interface BookDetailResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: BookDetail;
}

export const getBookDetailByAladinId = async (
    aladinItemId: number
): Promise<BookDetail> => {
    const response = await api.get<BookDetailResponse>(
        `/v1/books/aladin/${aladinItemId}`
    );

    return response.data.result;
};


// searchBooks 함수
export const searchBooks = async (keyword: string) => {
    try {
        const response = await api.get<SearchResponse>("/v1/books/aladin/search", {
            params: {
                keyword,
                start: 1,
                size: 20,
                queryType: "Keyword",
                searchTarget: "Book",
            }, // GET 쿼리 파라미터
        });
        return response.data.result.items;
    } catch (error) {
        console.error("도서 검색 실패:", error);
        return [];
    }
};
