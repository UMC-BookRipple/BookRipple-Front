import api from './axios';

interface BlindBook {
    blindBookId: number;
    title: string;
    subtitle: string;
    author: string;
    price: number;
    status: string | null;
}

interface BlindBookListResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        content: BlindBook[];
        nextCursor: number | null;
        hasNext: boolean;
    };
}

interface GetBlindBookListParams {
    status?: string;
    cursor?: number; // integer($int64)
    size?: number; // integer($int32)
}

export const getBlindBookList = async (params?: GetBlindBookListParams) => {
    const response = await api.get<BlindBookListResponse>('/v1/blind-books', {
        params,
    });
    return response.data;
};

interface CreateBlindBookRequest {
    actualBookId: number;
    title: string;
    subtitle: string;
    description: string;
    bookCondition: string; // "GOOD", "NORMAL", "BAD" etc.
    price: number;
}

interface CreateBlindBookResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        blindBookId: number;
        status: string;
        createdAt: string;
    };
}

export const createBlindBook = async (data: CreateBlindBookRequest) => {
    console.log('API Call: createBlindBook', data);
    const response = await api.post<CreateBlindBookResponse>(
        '/v1/blind-books',
        data,
    );
    return response.data;
};

interface BlindBookDetailResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        blindBookId: number;
        title: string;
        subtitle: string;
        description: string;
        price: number;
        status: string;
        requestCount: number;
        bookCondition: string;
        // 실제 책 정보 (백엔드에서 actualBook 연관 데이터 반환 시)
        actualBookTitle?: string;
        author?: string;
        coverUrl?: string;
    };
}


export const getBlindBookDetail = async (blindBookId: number) => {
    const response = await api.get<BlindBookDetailResponse>(
        `/v1/blind-books/${blindBookId}`,
    );
    return response.data;
};

interface DeleteBlindBookResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string | null;
}


export const deleteBlindBook = async (blindBookId: number) => {
    console.log('API Call: deleteBlindBook', blindBookId);
    const response = await api.delete<DeleteBlindBookResponse>(
        `/v1/blind-books/${blindBookId}`,
    );
    return response.data;
};

interface GetMyBlindBooksParams {
    status?: 'SALE' | 'SOLD_OUT' | 'TRADING';
    cursor?: number;
    size?: number;
}

export const getMyBlindBooks = async (params: GetMyBlindBooksParams) => {
    console.log('API Call: getMyBlindBooks', params);
    const response = await api.get<BlindBookListResponse>('/v1/blind-books/me', {
        params,
    });
    return response.data;
};

interface UpdateBlindBookRequest {
    title: string;
    subtitle: string;
    description: string;
    bookCondition: string;
    price: number;
}

export const updateBlindBook = async (blindBookId: number, data: UpdateBlindBookRequest) => {
    console.log('API Call: updateBlindBook', blindBookId, data);
    const response = await api.patch<CreateBlindBookResponse>(
        `/v1/blind-books/${blindBookId}`,
        data,
    );
    return response.data;
};

interface GetBlindBookRequestsResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        blindBookId: number;
        requests: {
            requestId: number;
            name: string;
            status: string; // "WAITING", "ACCEPTED" etc.
        }[];
    };
}

export const getBlindBookRequests = async (blindBookId: number) => {
    console.log('API Call: getBlindBookRequests', blindBookId);
    const response = await api.get<GetBlindBookRequestsResponse>(
        `/v1/blind-books/${blindBookId}/requests`,
    );
    return response.data;
};

interface GetBlindBookDetailForBuyerResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        blindBookId: number;
        title: string;
        subtitle: string;
        description: string;
        price: number;
        bookCondition: string;
        sellerName: string;
        purchaseStatus: string | null; // "WAITING", "ACCEPTED", "REJECTED" or null
        requestId: number | null;
    };
}

export const getBlindBookDetailForBuyer = async (blindBookId: number) => {
    console.log('API Call: getBlindBookDetailForBuyer', blindBookId);
    const response = await api.get<GetBlindBookDetailForBuyerResponse>(
        `/v1/blind-books/${blindBookId}/buyer`,
    );
    return response.data;
};

interface GetMyBlindBookRequestsParams {
    cursor?: number;
    size?: number;
}

interface GetMyBlindBookRequestsResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        content: {
            requestId: number;
            blindBookId: number; // 필수
            tradeId?: number;    // ★ 핵심: 거래 ID 추가 (없으면 null일 수도 있음)
            actualBookTitle: string;
            author: string;
            price: number;
            purchaseStatus: string;
        }[];
        nextCursor: number | null;
        hasNext: boolean;
    };
}

export const getMyBlindBookRequests = async (params?: GetMyBlindBookRequestsParams) => {
    console.log('API Call: getMyBlindBookRequests', params);
    const response = await api.get<GetMyBlindBookRequestsResponse>(
        '/v1/blind-books/my-requests',
        { params },
    );
    return response.data;
};
