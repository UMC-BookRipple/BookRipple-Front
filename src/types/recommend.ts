export interface RecommendBookCardData {
    id: number;
    imageUrl: string;
    title: string;
    author: string;
    recommendationContent?: string; // 추천 문구 (아직 없으면 optional)
    recommenderName?: string;        // 닉네임 (추후 API)
    baseBookTitle: string;
}
