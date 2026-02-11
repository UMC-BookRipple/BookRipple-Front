import { http } from "../../types/http";
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
        ? `/api/v1/books/${bookId}/reviews?lastId=${lastId}`
        : `/api/v1/books/${bookId}/reviews`;

    const { data } = await http.get<ReviewApiResponse>(url);
    return data;
};
