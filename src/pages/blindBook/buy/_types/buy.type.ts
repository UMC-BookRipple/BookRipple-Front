export type BuyTab = 'catalog' | 'requested';

export type BuyRequestStatus = '배송 시작' | '승인 대기' | '거래 수락' | '거래 취소';

export interface BuyRequestItem {
  id: string;
  titleHint: string;
  authorHint: string;
  price: number;
  status: BuyRequestStatus;
  // 결제하기 버튼이 필요한 상태(거래 수락/취소 등)
  needsPayment?: boolean;
}
