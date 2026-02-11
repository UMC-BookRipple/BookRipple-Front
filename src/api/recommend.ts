import api from "./axios";

// 추천글 항목 타입
export interface MyRecommendation {
    id: number;
    sourceBookTitle: string;
    targetBookTitle: string;
    content: string;
    updatedAt: string; // ISO 문자열
}

// API 반환 타입
export interface MyRecommendationsResult {
    myRecommendList: MyRecommendation[];
    hasNext: boolean;
    lastSourceBookTitle: string | null;
    lastId: number | null;
}

// 수정할 추천글 타입
export interface UpdateRecommendationBody {
    sourceBookTitle?: string;
    targetBookTitle?: string;
    content?: string;
}

// 수정 결과 타입
export interface UpdateRecommendationResult {
    id: number;
}

// 삭제 결과 타입 (문자열 반환)
export interface DeleteRecommendationResult {
    result: string;
}

// 일괄 삭제 결과 타입
export interface BulkDeleteRecommendationResult {
    deletedIds: number[]; // 성공적으로 삭제된 ID 리스트
}



// 내가 쓴 추천글 조회 함수
export const getMyRecommendations = async (
    lastId?: number,
    lastSourceBookTitle?: string,
    limit: number = 10
): Promise<MyRecommendationsResult> => {
    try {
        // 쿼리 파라미터
        const params: Record<string, string | number> = { limit };
        if (lastId) params.lastId = lastId;
        if (lastSourceBookTitle) params.lastSourceBookTitle = lastSourceBookTitle;

        const res = await api.get("/v1/recommendations/me", { params });

        if (!res.data?.isSuccess || !res.data.result) {
            throw new Error(res.data?.message || "추천글 조회 실패");
        }

        return res.data.result as MyRecommendationsResult;
    } catch (error) {
        console.error("추천글 조회 실패:", error);
        throw error;
    }
};

//추천글 수정 API
//param recommendationId 수정할 추천글 ID
//param body 수정할 내용 (sourceBookTitle, targetBookTitle, content)

export const updateRecommendation = async (
    recommendationId: number,
    body: UpdateRecommendationBody
): Promise<UpdateRecommendationResult> => {
    try {
        const res = await api.patch(`/v1/recommendations/${recommendationId}`, body);

        if (!res.data?.isSuccess || !res.data.result) {
            throw new Error(res.data?.message || "추천글 수정 실패");
        }

        return res.data.result as UpdateRecommendationResult;
    } catch (error) {
        console.error("추천글 수정 실패:", error);
        throw error;
    }
};

//추천글 삭제 API
export const deleteRecommendation = async (
    recommendationId: number
): Promise<DeleteRecommendationResult> => {
    try {
        const res = await api.delete(`/v1/recommendations/${recommendationId}`);

        if (!res.data?.isSuccess || !res.data.result) {
            throw new Error(res.data?.message || "추천글 삭제 실패");
        }

        return res.data.result as DeleteRecommendationResult;
    } catch (error) {
        console.error("추천글 삭제 실패:", error);
        throw error;
    }
};


/**
 * 추천글 여러 개 삭제 API
 * @param recommendationIds 삭제할 추천글 ID 배열
 */
export const bulkDeleteRecommendations = async (
    recommendationIds: number[]
): Promise<BulkDeleteRecommendationResult> => {
    try {
        const res = await api.delete(`/v1/recommendations`, {
            data: { ids: recommendationIds }, // DELETE 요청은 body에 data 전달
        });

        if (!res.data?.isSuccess || !res.data.result) {
            throw new Error(res.data?.message || "추천글 일괄 삭제 실패");
        }

        return { deletedIds: res.data.result as number[] };
    } catch (error) {
        console.error("추천글 일괄 삭제 실패:", error);
        throw error;
    }
};