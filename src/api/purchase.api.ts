import api from './axios';

interface CreatePurchaseRequestResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        purchaseRequestId: number;
        blindBookId: number;
        status: string;
        createdAt: string;
    };
}

export const createPurchaseRequest = async (blindSalePostId: number) => {
    console.log('API Call: createPurchaseRequest', blindSalePostId);
    const response = await api.post<CreatePurchaseRequestResponse>(
        `/v1/purchase-requests/${blindSalePostId}/create`,
        {}
    );
    return response.data;
};

interface CancelPurchaseRequestResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        purchaseRequestId: number;
        status: string;
        updatedAt: string;
    };
}

export const cancelPurchaseRequest = async (purchaseRequestId: number) => {
    console.log('API Call: cancelPurchaseRequest', purchaseRequestId);
    const response = await api.patch<CancelPurchaseRequestResponse>(
        `/v1/purchase-requests/${purchaseRequestId}/cancel`,
        {}
    );
    return response.data;
};

interface ApprovePurchaseRequestResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        purchaseRequestId: number;
        status: string;
        updatedAt: string;
    };
}

export const approvePurchaseRequest = async (purchaseRequestId: number) => {
    console.log('API Call: approvePurchaseRequest', purchaseRequestId);
    const response = await api.patch<ApprovePurchaseRequestResponse>(
        `/v1/purchase-requests/${purchaseRequestId}/approve`,
        {}
    );
    return response.data;
};
