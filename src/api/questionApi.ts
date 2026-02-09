import api from "./axios";

export type ApiResponse<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
};

export type BookQuestionItem = {
    id: number;
    type: 'USER' | string;
    content: string;
    createdAt: string;
    isMine?: boolean;
    answers?: AnswerItem[];
};


export type BookQuestionListResult = {
    questionList: BookQuestionItem[];
    hasNext: boolean;
    totalCnt: number;
    lastId: number;
};

export type ReadingAiQnAItem = {
    id: number;
    type: 'USER' | string;
    question: string;
    answer: string;
    updatedAt: string;
};

export type ReadingAiQnAListResult = {
    readingAiQnAs: ReadingAiQnAItem[];
    hasNext: boolean;
    lastId: number;
};

export type ContentReq = { content: string };

export type IdListReq = { idList: number[] };

export type AnswerItem = {
    id: number;
    content: string;
    updatedAt: string;
    isMine: boolean;
};

export type AnswerListResult = {
    ansList: AnswerItem[];
};

export type AiDuringQuestionResult = {
    id: number;
    type: 'USER' | string;
    content: string;
    createdAt: string;
};

/** ===== API functions ===== */

// POST 질문 생성
export async function createQuestion(params: {
    bookId: number;
    body: ContentReq;
}) {
    const { bookId, body } = params;
    const res = await api.post<ApiResponse<{ id: number }>>(
        `/v1/books/${bookId}/questions`,
        body,
    );
    return res.data;
}

// GET 질문 목록 조회
export async function getBookQuestions(params: {
    bookId: number;
    onlyMine?: boolean;
    keyword?: string;
    lastId?: number;
    size?: number;
}) {
    const { bookId, ...query } = params;
    const res = await api.get<ApiResponse<BookQuestionListResult>>(
        `/v1/books/${bookId}/questions`,
        { params: query },
    );
    return res.data;
}

// DELETE 질문 삭제
export async function deleteQuestion(questionId: number) {
    const res = await api.delete<ApiResponse<{ id: number }>>(
        `/v1/questions/${questionId}`,
    );
    return res.data;
}

// POST 질문 답변 생성
export async function createQuestionAnswer(params: {
    questionId: number;
    body: ContentReq;
}) {
    const { questionId, body } = params;
    const res = await api.post<ApiResponse<{ id: number }>>(
        `/v1/questions/${questionId}/answers`,
        body,
    );
    return res.data;
}

// GET 질문 답변 목록 조회
export async function getQuestionAnswers(questionId: number) {
    const res = await api.get<ApiResponse<AnswerListResult>>(
        `/v1/questions/${questionId}/answers`,
    );
    return res.data;
}

// POST 완독 후 질문 생성
export async function createAiAfterQuestions(bookId: number) {
    const res = await api.post<ApiResponse<BookQuestionListResult>>(
        `/v1/books/${bookId}/questions/ai/after`,
    );
    return res.data;
}

// POST 방향성 질문 생성
export async function createAiDuringQuestion(bookId: number) {
    const res = await api.post<ApiResponse<AiDuringQuestionResult>>(
        `/v1/books/${bookId}/questions/ai/during`,
    );
    return res.data;
}

// PATCH 방향성 질문에 대한 답변 저장
export async function patchReadingAnswer(params: {
    readingQuestionId: number;
    body: ContentReq;
}) {
    const { readingQuestionId, body } = params;
    const res = await api.patch<ApiResponse<{ id: number }>>(
        `/v1/reading-questions/${readingQuestionId}`,
        body,
    );
    return res.data;
}

// GET 방향성 질문,답변 목록 조회
export async function getReadingQuestions(params: {
    bookId: number;
    lastId?: number;
    size?: number;
}) {
    const { bookId, ...query } = params;
    const res = await api.get<ApiResponse<ReadingAiQnAListResult>>(
        `/v1/books/${bookId}/reading-questions`,
        { params: query },
    );
    return res.data;
}

// DELETE 방향성 질문&답변 삭제
export async function deleteReadingQuestion(readingQuestionId: number) {
    const res = await api.delete<ApiResponse<{ id: number }>>(
        `/v1/reading-questions/${readingQuestionId}`,
    );
    return res.data;
}

// POST 내가 쓴 질문 일괄 삭제
export async function batchDeleteMyQuestions(body: IdListReq) {
    const res = await api.post<ApiResponse<string>>(
        `/v1/questions/me/batch-delete`,
        body,
    );
    return res.data;
}

export const searchQuestions = async (
    bookId: number,
    keyword: string

): Promise<BookQuestionItem[]> => {
    try {
        const response = await api.get<ApiResponse<BookQuestionListResult>>(
            `/v1/books/${bookId}/search`,
            {
                params: { query: keyword },
            }
        );

        if (!response.data.isSuccess) {
            console.error("질문 검색 실패:", response.data.message);
            return [];
        }

        return response.data.result.questionList;
    } catch (error) {
        console.error("질문 검색 API 에러:", error);
        return [];
    }
};