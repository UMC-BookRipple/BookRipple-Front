//import api from "../axios";

export interface RecommendationResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: { id: number };
}

export const submitRecommendation = async (
    baseBookId: number,
    targetBookId: number,
    content: string
): Promise<RecommendationResponse> => {
    console.log("테스트용 submit:", { baseBookId, targetBookId, content });
    // 서버 호출 없이 바로 성공 응답 반환
    return {
        isSuccess: true,
        code: "SUCCESS",
        message: "테스트용 저장 완료",
        result: { id: 999 },
    };
    /*const response = await api.post<RecommendationResponse>(
        `/v1/books/${baseBookId}/recommendations`,
        {
            targetBookId,
            content
        }
    );
    return response.data;*/
};
