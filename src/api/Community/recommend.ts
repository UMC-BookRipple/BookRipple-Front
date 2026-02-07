// api/Community/recommend.ts
import api from "../axios";
import { type RecommendBook } from "../../types/RecommendBook";

export interface RecommendResponse {
    recommendList: RecommendBook[];
    lastId: number | null;
    hasNext: boolean;
}

export interface RecommendApiResponse {
    isSuccess: boolean;
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
        ? `/v1/books/${bookId}/recommendations?lastId=${lastId}`
        : `/v1/books/${bookId}/recommendations`;

    const { data } = await api.get<RecommendApiResponse>(url);
    return data;
};
