// api/Community/recommend.ts
import { http } from "../../types/http";
import { type RecommendBook } from "../../types/recommendbook";

export interface RecommendResponse {
    recommendList: RecommendBook[];
    lastId: number | null;
    hasNext: boolean;
}

export interface RecommendApiResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: RecommendResponse | null;
}

export interface FetchRecommendParams {
    bookId: number;
    lastId?: number | null;
}

export const fetchRecommendBooks = async ({
    bookId,
    lastId,
}: FetchRecommendParams): Promise<RecommendApiResponse> => {
    const url = lastId
        ? `/api/v1/books/${bookId}/recommendations?lastId=${lastId}`
        : `/api/v1/books/${bookId}/recommendations`;

    const { data } = await http.get<RecommendApiResponse>(url);
    return data;
};
