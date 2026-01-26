export interface Answer {
    id: number;
    content: string;
}

export interface Question {
    id: number;
    content: string;
    answers: Answer[];
    isMine: boolean; // 내가 쓴 질문인지 여부
}

export const dummyQnA: Question[] = [
    {
        id: 1,
        content: "설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다",
        answers: [
            { id: 1, content: "설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다. 누군가를 좋아하지만 쉽게 다가가지 못하는 마음, 말로 꺼내기 전까지 계속 마음속에 머무는 감정들이 자연스럽게 떠오른다." },
            { id: 2, content: "설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다. 누군가를 좋아하지만 쉽게 다가가지 못하는 마음, 말로 꺼내기 전까지 계속 마음속에 머무는 감정들이 자연스럽게 떠오른다." },
        ],
        isMine: true, // 내가 쓴 질문
    },
    {
        id: 2,
        content: "설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다",
        answers: [
            { id: 1, content: "설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다. 누군가를 좋아하지만 쉽게 다가가지 못하는 마음, 말로 꺼내기 전까지 계속 마음속에 머무는 감정들이 자연스럽게 떠오른다." },
        ],
        isMine: false, // 다른 사람이 쓴 질문
    },
];

