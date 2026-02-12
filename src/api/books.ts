// src/api/books.ts
import { http } from "../types/http";

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

// 검색 기록 타입
export interface SearchHistoryItem {
    historyId: number;
    keyword: string;
    searchedAt: string;
}

interface SearchHistoryResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        items: SearchHistoryItem[];
        lastId: number;
        hasNext: boolean;
    };
}

interface DeleteAllHistoryResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        deletedCount: number;
    };
}

interface DeleteHistoryResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        deleted: boolean;
    };
}

export const getBookDetailByAladinId = async (
    aladinItemId: number
): Promise<BookDetail> => {
    const response = await http.get<BookDetailResponse>(
        `/api/v1/books/aladin/${aladinItemId}`
    );

    return response.data.result;
};

// 내부 bookId로 책 상세 정보 조회 (aladinItemId 포함)
/*export const getBookDetailByBookId = async (
    bookId: number
): Promise<BookDetail> => {
    try {
        const response = await http.get<BookDetailResponse>(
            `/api/v1/books/${bookId}`
        );
        if (!response.data.isSuccess) {
            throw new Error(`API 호출 실패: ${response.data.message}`);
        }
        return response.data.result;
    } catch (error) {
        console.error("책 상세 조회 실패:", error);
        throw error;
    }
};*/


// searchBooks 함수
export const searchBooks = async (keyword: string,
    type: "BOOK" | "COMMUNITY" = "BOOK"
) => {
    try {
        const response = await http.get<SearchResponse>("/api/v1/books/aladin/search", {
            params: {
                keyword,
                start: 1,
                size: 20,
                queryType: "Keyword",
                searchTarget: "Book",
                type,
            }, // GET 쿼리 파라미터
        });
        return response.data.result.items;
    } catch (error) {
        console.error("도서 검색 실패:", error);
        return [];
    }
};

// 🔍 커뮤니티 검색 기록 조회
export const fetchCommunitySearchHistory = async (): Promise<SearchHistoryItem[]> => {
    try {
        const response = await http.get<SearchHistoryResponse>(
            "/api/v1/books/search/history",
            {
                params: {
                    type: "COMMUNITY",
                },
            }
        );

        if (!response.data.isSuccess) {
            console.error("검색 기록 조회 실패:", response.data.message);
            return [];
        }

        return response.data.result.items;
    } catch (error) {
        console.error("검색 기록 API 에러:", error);
        return [];
    }
};

export const deleteAllSearchHistory = async (type: "BOOK" | "COMMUNITY") => {
    const response = await http.delete<DeleteAllHistoryResponse>(
        "/api/v1/books/search/history",
        { params: { type } }
    );
    if (!response.data.isSuccess) throw new Error(response.data.message);
    return response.data.result.deletedCount;
};

export const deleteSearchHistoryById = async (
    historyId: number
): Promise<boolean> => {
    const response = await http.delete<DeleteHistoryResponse>(
        `/api/v1/books/search/history/${historyId}`
    );

    if (!response.data.isSuccess) {
        throw new Error(response.data.message);
    }

    return response.data.result.deleted;
};

// 🔍 BOOK 타입 검색 기록 조회
export const fetchBookSearchHistory = async (): Promise<SearchHistoryItem[]> => {
    try {
        const response = await http.get<SearchHistoryResponse>(
            "/api/v1/books/search/history",
            {
                params: {
                    type: "BOOK",
                },
            }
        );

        if (!response.data.isSuccess) {
            console.error("검색 기록 조회 실패:", response.data.message);
            return [];
        }

        return response.data.result.items;
    } catch (error) {
        console.error("검색 기록 API 에러:", error);
        return [];
    }
};
