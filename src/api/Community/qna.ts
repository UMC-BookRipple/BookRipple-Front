// src/api/qna.ts
import api from '../axios'; // axios 인스턴스를 가져옵니다

export interface Question {
    id: number;
    type: string; // 예: 'USER' 또는 다른 타입
    content: string;
    createdAt: string; // 날짜 형식
    isMine: boolean; // 내가 작성한 질문인지 여부
    answers: Answer[]; // 답변 목록
}

export interface Answer {
    id: number;
    content: string;
}

export interface QnAResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        questionList: Question[];
        hasNext: boolean;
        totalCnt: number;
        lastId: number;
    };
}

export const fetchQuestions = async (query: string, bookId: number): Promise<Question[]> => {
    try {
        // 절대경로로 API 호출 (baseURL 설정에 관계없이)
        const response = await api.get<QnAResponse>(`/v1/books/${bookId}/questions`, {
            params: { query }, // 검색어를 쿼리 파라미터로 전달
        });

        if (response.data.isSuccess) {
            return response.data.result.questionList.map((question) => ({
                ...question,
                isMine: question.type === "USER", // 예시로 type이 "USER"인 경우 isMine을 true로 설정
                answers: Array.isArray(question.answers) ? question.answers : [],  // answers가 없으면 빈 배열로 설정
            }));
        } else {
            console.error("API 호출 실패:", response.data.message);
            return []; // 실패 시 빈 배열 반환
        }
    } catch (error) {
        console.error("질문 조회 실패:", error);
        return []; // 오류 발생 시 빈 배열 반환
    }
};