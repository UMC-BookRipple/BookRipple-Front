import api from "../axios";
import { type TodayRecommendBook } from "../../types/todayrecommend";

interface TodayRecommendResponse {
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    hasNext: boolean;
    items: TodayRecommendBook[];
}

export const getTodayRecommendBooks = async (): Promise<TodayRecommendResponse> => {
    const res = await api.get("/v1/books/itemNewSpecial");

    if (!res.data?.isSuccess || !res.data.result) {
        throw new Error("오늘의 추천도서 조회 실패");
    }

    return res.data.result;
};
