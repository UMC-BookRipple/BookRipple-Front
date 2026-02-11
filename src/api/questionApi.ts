import { http } from './http';

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
    isMine: boolean;
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
    readingAiQnAS: ReadingAiQnAItem[];
    hasNext: boolean;
    lastId: number | null;
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
    const res = await http.post<ApiResponse<{ id: number }>>(
        `/api/v1/books/${bookId}/questions`,
        body,
    );
    return res.data;
}

// GET 질문 목록 조회
export async function getBookQuestions(params: {
    bookId: number;
    onlyMine: boolean;
    keyword?: string;
    lastId?: number;
    size?: number;
}) {
    const { bookId, ...query } = params;
    const res = await http.get<ApiResponse<BookQuestionListResult>>(
        `/api/v1/books/${bookId}/questions`,
        { params: query },
    );
    return res.data;
}

// DELETE 질문 삭제
export async function deleteQuestion(questionId: number) {
    const res = await http.delete<ApiResponse<{ id: number }>>(
        `/api/v1/questions/${questionId}`,
    );
    return res.data;
}

// POST 질문 답변 생성
export async function createQuestionAnswer(params: {
    questionId: number;
    body: ContentReq;
}) {
    const { questionId, body } = params;
    const res = await http.post<ApiResponse<{ id: number }>>(
        `/api/v1/questions/${questionId}/answers`,
        body,
    );
    return res.data;
}

// GET 질문 답변 목록 조회
export async function getQuestionAnswers(questionId: number) {
    const res = await http.get<ApiResponse<AnswerListResult>>(
        `/api/v1/questions/${questionId}/answers`,
    );
    return res.data;
}

// POST 완독 후 질문 생성
export async function createAiAfterQuestions(bookId: number) {
    const res = await http.post<ApiResponse<BookQuestionListResult>>(
        `/api/v1/books/${bookId}/questions/ai/after`,
    );
    return res.data;
}

// POST 방향성 질문 생성
export async function createAiDuringQuestion(bookId: number) {
    const res = await http.post<ApiResponse<AiDuringQuestionResult>>(
        `/api/v1/books/${bookId}/questions/ai/during`,
    );
    return res.data;
}

// PATCH 방향성 질문에 대한 답변 저장
export async function patchReadingAnswer(params: {
    readingQuestionId: number;
    body: ContentReq;
}) {
    const { readingQuestionId, body } = params;
    const res = await http.patch<ApiResponse<{ id: number }>>(
        `/api/v1/reading-questions/${readingQuestionId}`,
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
    const res = await http.get<ApiResponse<ReadingAiQnAListResult>>(
        `/api/v1/books/${bookId}/reading-questions`,
        { params: query },
    );
    return res.data;
}

// DELETE 방향성 질문&답변 삭제
export async function deleteReadingQuestion(readingQuestionId: number) {
    const res = await http.delete<ApiResponse<{ id: number }>>(
        `/api/v1/reading-questions/${readingQuestionId}`,
    );
    return res.data;
}

// POST 내가 쓴 질문 일괄 삭제
export async function batchDeleteMyQuestions(body: IdListReq) {
    const res = await http.post<ApiResponse<string>>(
        `/api/v1/questions/me/batch-delete`,
        body,
    );
    return res.data;
}

//GET 커뮤니티- 도서 질문 검색
export const searchQuestions = async (
    bookId: number,
    keyword: string

): Promise<BookQuestionItem[]> => {
    try {
        const response = await http.get<ApiResponse<BookQuestionListResult>>(
            `/api/v1/books/${bookId}/search`,
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

// fetchCommunitySearchHistory 함수 작성
export const fetchCommunitySearchHistory = async () => {
    try {
        const response = await http.get("/api/v1/community/search/history");
        if (response.data.isSuccess) {
            return response.data.result.questionList.map((item: any) => ({
                keyword: item.content,  // 질문 내용을 최근 검색어로 사용
                historyId: item.id,  // 질문 ID를 검색 기록 ID로 사용
            }));
        } else {
            throw new Error('최근 검색어를 불러오는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('최근 검색어 조회 실패', error);
        throw error;
    }
};

// 특정 검색어 삭제하기
export const deleteSearchHistoryById = async (historyId: number) => {
    try {
        const response = await http.delete(`api/v1/community/search/history/${historyId}`);
        if (response.data.isSuccess) {
            return true; // 삭제 성공
        } else {
            throw new Error(response.data.message || '검색어 삭제 실패');
        }
    } catch (error) {
        console.error('검색어 삭제 실패:', error);
        throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
    }
};

// 전체 삭제 API
export const deleteAllSearchHistory = async () => {
    try {
        const response = await http.delete("api/v1/community/search/history");
        if (response.data.isSuccess) {
            return true; // 전체 삭제 성공
        } else {
            throw new Error(response.data.message || '전체 검색어 삭제 실패');
        }
    } catch (error) {
        console.error('전체 검색어 삭제 실패:', error);
        throw error;
    }
};

