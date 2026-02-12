import { http } from "../../types/http";

export interface RecommendationResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: { id: number };
}

export const submitRecommendation = async (
    baseBookId: number,
    targetBookAladinId: number, // 이름도 맞춰주는 게 좋음
    content: string
): Promise<RecommendationResponse> => {
    try {
        const response = await http.post<RecommendationResponse>(
            `/api/v1/books/${baseBookId}/recommendations`,
            {
                targetBookAladinId, // ✅ 서버 스펙에 맞게 수정
                content,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("추천 저장 실패:", error.response || error.message);
        throw new Error(
            error.response?.data?.message || "추천 저장 중 오류가 발생했습니다."
        );
    }
};

