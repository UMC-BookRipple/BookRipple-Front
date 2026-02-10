export type BlindBookSellTab = 'buy' | 'sell';
export type SellStatusTab = 'selling' | 'done';

export type SellItemStatusBadge = '거래요청' | '배송대기' | '거래완료' | null;

export interface BlindBookSellItem {
  id: string;
  titleHint: string; // 브람스를 좋아하세요...
  authorHint: string; // 프랑수아즈 사강
  price: number; // 6000
  badge: SellItemStatusBadge; // 거래요청 / 배송대기 / null
  isDone: boolean; // 거래완료 탭에 들어갈지
  memo: string; // 블라인드 문구(상세에 긴 텍스트)
  stickyText: string; // 포스트잇 문구
  requestCount: number; // 판매요청 n명
}

export interface SellRequest {
  id: string;
  nickname: string; // 익명의 사용자 1325
  accepted: boolean;
}
