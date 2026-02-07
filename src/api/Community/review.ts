import api from "../axios";
import { type Review } from "../../types/review";

export interface ReviewResult {
    reviewList: Review[];
    hasNext: boolean;
    lastId: number | null;
}

export interface ReviewApiResponse {
    isSuccess: boolean;
    result: ReviewResult | null;
}

interface FetchReviewParams {
    bookId: number;
    lastId?: number | null;
}

export const fetchReviews = async ({
    bookId,
    lastId,
}: FetchReviewParams): Promise<ReviewApiResponse> => {
    const url = lastId
        ? `/v1/books/${bookId}/reviews?lastId=${lastId}`
        : `/v1/books/${bookId}/reviews`;

    const { data } = await api.get<ReviewApiResponse>(url);
    return data;
};
