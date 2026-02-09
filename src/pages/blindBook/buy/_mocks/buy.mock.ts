import type { BuyRequestItem } from '../_types/buy.type';

export const MOCK_BUY_REQUESTS: BuyRequestItem[] = [
  { id: '1', titleHint: '브람스를 좋아하세요...', authorHint: '프랑수아즈 사강', price: 6000, status: '배송 시작' },
  { id: '2', titleHint: '브람스를 좋아하세요...', authorHint: '프랑수아즈 사강', price: 6000, status: '승인 대기' },
  { id: '3', titleHint: '브람스를 좋아하세요...', authorHint: '프랑수아즈 사강', price: 6000, status: '거래 수락', needsPayment: true },
  { id: '4', titleHint: '브람스를 좋아하세요...', authorHint: '프랑수아즈 사강', price: 6000, status: '거래 취소', needsPayment: true },
];
