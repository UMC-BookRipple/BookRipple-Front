export interface RecommendBook {
    id: number;
    sourceBookTitle: string;
    targetBookId: number;
    targetBookTitle: string;
    targetBookCover: string;
    targetBookAuthor: string;
    nickname: string;
    content: string;
    updatedAt: string;
    isLiked: boolean;
}

export interface RecommendResult {
    recommendList: RecommendBook[];
    lastId: number | null;
    hasNext: boolean;
}

export interface RecommendApiResponse {
    isSuccess: boolean;
    result: RecommendResult | null;
}