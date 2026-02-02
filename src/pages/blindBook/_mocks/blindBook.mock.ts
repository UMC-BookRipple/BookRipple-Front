import type { BlindBookSellItem, SellRequest } from '../_types/blindBook.type';

export const MOCK_SELL_ITEMS: BlindBookSellItem[] = [
  {
    id: '1',
    titleHint: '브람스를 좋아하세요...',
    authorHint: '프랑수아즈 사강',
    price: 6000,
    badge: '거래요청',
    isDone: false,
    requestCount: 3,
    stickyText:
      '조용하지만\n흔들림은 깊고,\n느리지만\n끝내 마음을\n바꾸는 이야기',
    memo: '누군가를 오래 좋아한다는 건, 때로는 자신의 외로움까지 끌어안는 일이다. 삼십대의 그녀는 흔들리는 감정 사이에서 늦게 찾아온 관계의 의미를 다시 헤아리게 된다.\n  조용하지만 흔들림은 깊고, 느리지만 끝내 마음을 바꾸는 이야기',
  },
  {
    id: '2',
    titleHint: '브람스를 좋아하세요...',
    authorHint: '프랑수아즈 사강',
    price: 6000,
    badge: '배송대기',
    isDone: false,
    requestCount: 1,
    stickyText:
      '조용하지만\n흔들림은 깊고,\n느리지만\n끝내 마음을\n바꾸는 이야기',
    memo: '사랑처럼 프랑스 문학 특유의 냉소적이면서도 따뜻한 시선이 담겨 있습니다. 사랑받고 싶어 하는 인간의 근원적인 외로움을 다루며, 브람스를 좋아하세요...가 연인 간의 고독을 다룬다면 이 책은 삶 전체에 놓인 고독을 다룹니다.',
  },
  {
    id: '3',
    titleHint: '브람스를 좋아하세요...',
    authorHint: '프랑수아즈 사강',
    price: 6000,
    badge: null,
    isDone: false,
    requestCount: 0,
    stickyText:
      '조용하지만\n흔들림은 깊고,\n느리지만\n끝내 마음을\n바꾸는 이야기',
    memo: '누군가를 오래 좋아한다는 건, 때로는 자신의 외로움까지 끌어안는 일이다. 삼십대의 그녀는 흔들리는 감정 사이에서 늦게 찾아온 관계의 의미를 다시 헤아리게 된다.\n  조용하지만 흔들림은 깊고, 느리지만 끝내 마음을 바꾸는 이야기',
  },
  // 거래완료 탭
  {
    id: '4',
    titleHint: '브람스를 좋아하세요...',
    authorHint: '프랑수아즈 사강',
    price: 6000,
    badge: '거래완료',
    isDone: true,
    requestCount: 0,
    stickyText:
      '조용하지만\n흔들림은 깊고,\n느리지만\n끝내 마음을\n바꾸는 이야기',
    memo: '거래완료된 아이템 목데이터',
  },
  {
    id: '5',
    titleHint: '브람스를 좋아하세요...',
    authorHint: '프랑수아즈 사강',
    price: 6000,
    badge: '거래완료',
    isDone: true,
    requestCount: 0,
    stickyText:
      '조용하지만\n흔들림은 깊고,\n느리지만\n끝내 마음을\n바꾸는 이야기',
    memo: '거래완료된 아이템 목데이터',
  },
  {
    id: '6',
    titleHint: '테스트 도서 1',
    authorHint: '테스트 작가',
    price: 12000,
    badge: '거래요청',
    isDone: false,
    requestCount: 2,
    stickyText: '코믹하고\n유쾌한\n일상의\n소소한\n행복',
    memo: '테스트용 메모 데이터입니다.',
  },
  {
    id: '7',
    titleHint: '테스트 도서 2',
    authorHint: '테스트 작가',
    price: 8500,
    badge: '배송대기',
    isDone: false,
    requestCount: 1,
    stickyText: '진지하고\n무거운\n삶의\n철학적\n고찰',
    memo: '테스트용 메모 데이터입니다.',
  },
  {
    id: '8',
    titleHint: '테스트 도서 3',
    authorHint: '테스트 작가',
    price: 9000,
    badge: null,
    isDone: false,
    requestCount: 0,
    stickyText: '따뜻하고\n감성적인\n위로의\n말들',
    memo: '테스트용 메모 데이터입니다.',
  },
];

export const MOCK_REQUESTS: Record<string, SellRequest[]> = {
  '1': [
    { id: 'r1', nickname: '익명의 사용자 1325', accepted: false },
    { id: 'r2', nickname: '익명의 사용자 1325', accepted: false },
    { id: 'r3', nickname: '익명의 사용자 1325', accepted: false },
  ],
  '2': [{ id: 'r1', nickname: '익명의 사용자 1325', accepted: true }],
};
