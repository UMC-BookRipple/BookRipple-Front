

export interface Question {
    id: number;
    type: string; // 예: 'USER' 또는 다른 타입
    content: string;
    createdAt: string; // 날짜 형식
    isMine?: boolean; // 내가 작성한 질문인지 여부
    answers?: Answer[]; // 답변 목록
}

export interface Answer {
    id: number;
    content: string;
}