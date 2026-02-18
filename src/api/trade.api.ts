import api from './axios';

interface PreparePaymentRequest {
    address: string;
    provider: string;
}

interface PreparePaymentResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        orderId: string;
        amount: number;
    };
}

export const preparePayment = async (tradeId: number, data: PreparePaymentRequest) => {
    console.log('API Call: preparePayment', tradeId, data);
    const response = await api.post<PreparePaymentResponse>(
        `/v1/trades/${tradeId}/prepare`,
        data
    );
    return response.data;
};

interface ConfirmPaymentResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

export const confirmPayment = async (
    tradeId: number,
    paymentKey: string,
    orderId: string,
    amount: number
) => {
    console.log('API Call: confirmPayment', { tradeId, paymentKey, orderId, amount });
    const response = await api.post<ConfirmPaymentResponse>(
        `/v1/trades/${tradeId}/confirm`,
        {},
        {
            params: {
                paymentKey,
                orderId,
                amount,
            },
        }
    );
    return response.data;
};

interface GetShippingInfoResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        title: string;
        price: number;
        buyerNickname: string;
        shippingAddress: string;
    };
}

export const getShippingInfo = async (tradeId: number) => {
    console.log('API Call: getShippingInfo', tradeId);
    const response = await api.get<GetShippingInfoResponse>(
        `/v1/trades/${tradeId}/shipping`
    );
    return response.data;
};

interface SubmitShippingInfoRequest {
    companyName: string; // e.g., "CONVENIENCE", "POST_OFFICE"
    shippingNumber: string;
}

interface SubmitShippingInfoResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

export const submitShippingInfo = async (tradeId: number, data: SubmitShippingInfoRequest) => {
    console.log('API Call: submitShippingInfo', tradeId, data);
    const response = await api.patch<SubmitShippingInfoResponse>(
        `/v1/trades/${tradeId}/shipping`,
        data
    );
    return response.data;
};

interface CancelTradeResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
}

export const cancelTrade = async (tradeId: number) => {
    console.log('API Call: cancelTrade', tradeId);
    const response = await api.patch<CancelTradeResponse>(
        `/v1/trades/${tradeId}/cancel`
    );
    return response.data;
};

/* --- 추가된 부분: 거래 상세 조회 (배송 정보 등) --- */
export interface TradeDetailResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        tradeId: number;
        status: string;
        companyName?: string;    // 배송사
        shippingNumber?: string; // 송장번호
        [key: string]: any;      // 기타 필드
    };
}

export const getTradeDetail = async (tradeId: number) => {
    console.log('API Call: getTradeDetail', tradeId);
    // 거래 상세 정보를 조회하는 API (엔드포인트는 백엔드 명세에 따라 조정 필요)
    // 보통 GET /v1/trades/{tradeId} 를 사용합니다.
    const response = await api.get<TradeDetailResponse>(
        `/v1/trades/${tradeId}`
    );
    return response.data;
};