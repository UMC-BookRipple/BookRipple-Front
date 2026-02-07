// src/api/library.ts
import api from "../axios";
import { type LibraryBook } from "../../types/mybook";

export type LibraryStatus = "LIKED" | "READING" | "COMPLETED";

interface LibraryResponse {
    items: LibraryBook[];
    hasNext: boolean;
    lastId: number;
}

/**
 * 내 서재 도서 목록 조회
 */
export const getMyLibraryBooks = async (
    status: LibraryStatus,
    lastId?: number
): Promise<LibraryResponse> => {
    const res = await api.get("/v1/library/books", {
        params: {
            status,
            lastId,
        },
    });

    return res.data.result;
};
