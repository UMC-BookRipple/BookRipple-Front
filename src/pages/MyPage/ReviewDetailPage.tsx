import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCommentBox from "../../components/ReviewCommentBox";
import BookTitleLabel from "../../components/BookTitleLabel";
import MenuBarItems from "../../components/MenuBarItems";
import Divider from "../../components/Divider";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { http } from "../../types/http";
import DeleteUnderBar from "../../components/DeleteUnderBar";

interface MyReview {
    id: number;
    bookTitle: string;
    content: string;
    updatedAt: string;
    createdAt?: string;
}

interface MyReviewsApiResponse {
    isSuccess: boolean;
    message: string;
    result?: {
        myReviewList?: MyReview[] | null;
    };
}

interface MyMemosApiResponse {
    isSuccess: boolean;
    message: string;
    result?: {
        memoList?: Array<{
            bookTitle: string;
            reviewWriter: string;
            reviewContent: string;
            reviewUpdatedAt: string;
            reviewMemoId: number;
            memoContent: string;
            memoUpdatedAt: string;
        }> | null;
        hasNext: boolean;
        lastBookTitle: string;
        lastId: number;
    };
}

type ContentIdBody = { id: number; content: string };

export default function ReviewDetailPage() {
    const { reviewId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState<MyReview | null>(null);

    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedReviews, setSelectedReviews] = useState<number[]>([]);

    // 감상평 수정
    const [isReviewEdit, setIsReviewEdit] = useState(false);
    const [isReviewMemoEdit, setIsReviewMemoEdit] = useState(false);
    const [reviewDraft, setReviewDraft] = useState("");

    // 메모(1개)
    const [reviewMemoId, setReviewMemoId] = useState<number | null>(null);
    const [memoDraft, setMemoDraft] = useState("");


    const authHeader = () => {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : undefined;
    };


    // 감상평 메모 선택
    const toggleSelect = (id: number) => {
        if (!isSelectMode) return;

        setSelectedReviews((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const isUnderBarOpen = selectedReviews.length > 0 && isSelectMode;

    // 1) 리뷰 찾기
    useEffect(() => {
        const fetchReview = async () => {
            const res = await http.get<MyReviewsApiResponse>(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/me`,
                { headers: authHeader() }
            );

            const { isSuccess, message, result } = res.data;

            if (!isSuccess) {
                console.log(message);
                navigate(`/reviews/me/${reviewId}`);
                return;
            }

            const list = result?.myReviewList ?? [];
            const found = list.find((x) => x.id === Number(reviewId)) ?? null;

            setReview(found);
            if (found) setReviewDraft(found.content);
        };

        if (reviewId) fetchReview();
    }, [reviewId]);

    // 2) 메모 불러오기: /review-memos/me 에서 현재 리뷰와 매칭되는 memo 찾기
    useEffect(() => {
        const fetchMemoForThisReview = async () => {
            if (!reviewId) return;

            try {
                const res = await http.get<MyMemosApiResponse>(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/review-memos/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        }
                    }
                );

                const { isSuccess, message, result } = res.data;
                if (!isSuccess) {
                    console.log(message);
                    return;
                }

                if (!review) return;
                const memoList = res.data.result?.memoList ?? [];

                // id가 없으니 bookTitle + reviewContent로 매칭
                const found = memoList.find(
                    (m) => m.bookTitle === review.bookTitle && m.reviewContent === review.content
                );

                if (found && found.reviewMemoId !== 0) {
                    setReviewMemoId(found.reviewMemoId);
                    setMemoDraft(found.memoContent ?? "");
                } else {
                    setReviewMemoId(null);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchMemoForThisReview();
    }, [reviewId, review]);

    // 감상평 저장 (PATCH /reviews/{review-id})
    const handleSaveReview = async () => {
        if (!review) return;
        if (!reviewDraft.trim()) return alert("감상평 내용을 입력해주세요.");

        const body: ContentIdBody = { id: review.id, content: reviewDraft };

        const res = await http.patch(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${review.id}`,
            body,
            { headers: authHeader() }
        );

        if (!res.data.isSuccess) return alert(res.data.message);

        setReview((prev) => (prev ? { ...prev, content: reviewDraft } : prev));
        setIsReviewEdit(false);

    };

    const handleCancelReview = () => {
        if (!review) return;
        setReviewDraft(review.content);
        setIsReviewEdit(false);
    };

    // 메모 생성 (POST /reviews/{review-id}/review-memos)
    const handleCreateMemo = async () => {
        if (!review) return;
        if (!memoDraft.trim()) return alert("메모 내용을 입력해주세요.");

        const body: ContentIdBody = { id: review.id, content: memoDraft };

        const res = await http.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${review.id}/review-memos`,
            body,
            { headers: authHeader() }
        );

        const { isSuccess, message, result, code } = res.data;

        if (!isSuccess) return alert(message);

        // 응답이 { id, content }라고 했으니 result로 받는다고 가정
        const created = result as { id: number; content: string } | undefined;
        if (created?.id != null) {
            setReviewMemoId(created.id);
            setMemoDraft(created.content);
        }
    };

    // 메모 수정 (PATCH /review-memos/{review-memo-id})
    const handleUpdateMemo = async () => {
        if (!reviewMemoId) return;
        if (!memoDraft.trim()) return alert("메모 내용을 입력해주세요.");

        const body: ContentIdBody = { id: reviewMemoId, content: memoDraft };

        const res = await http.patch(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/review-memos/${reviewMemoId}`,
            body,
            { headers: authHeader() }
        );

        const { isSuccess, message, code, result } = res.data;

        if (isSuccess) {
            setIsReviewMemoEdit(false);
        }

        if (!isSuccess) {
            if (message) alert(message);
            return;
        }
    };


    // 메모 삭제
    const handleMemoDelete = async () => {
        const memoId = selectedReviews[0];
        if (!memoId) return;

        try {
            const response = await http.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/review-memos/${memoId}`,
                { headers: authHeader() }
            );

            const { isSuccess, message } = response.data;
            if (!isSuccess) return alert(message);

            // ✅ 메모만 지운 거니까 review는 건들지 말고, 메모 상태만 초기화
            setSelectedReviews([]);
            setIsSelectMode(false);
            setReviewMemoId(null);
            setMemoDraft("");
        } catch (e) {
            console.error(e);
        }
    };


    if (!review) return <div className="p-4">리뷰를 찾을 수 없어요.</div>;

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E] pb-[110px]">
            <Header />

            <div className="w-full flex items-center px-[14px] pt-[30px]">
                <span className="h-[50px] flex items-center font-[GmarketSansBold] text-[20px]">
                    MY PAGE
                </span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems mainLabel="내 기록 확인"
                    onClickMain={() => navigate("/my-page/menu")}
                    MenuBarLabel="감상평"
                    plusMenuLabel="선택"
                    onClick={() => navigate('/reviews/me')}
                    onClickPlus={() => setIsSelectMode((prev) => !prev)}
                    isSelectMode={isSelectMode} />
                <Divider />
            </div>

            <div className="w-full flex flex-col">
                <BookTitleLabel BookTitle={review.bookTitle} />

                {/* 감상평 수정 */}
                <div className="flex flex-col">
                    {!isReviewEdit ? (
                        <div onClick={() => setIsReviewEdit(true)}>
                            <ReviewCommentBox content={review.content} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 py-[10px] px-[16px]">
                            <textarea
                                className="w-full flex flex-col gap-[10px] p-[14px] bg-[#FFF] text-[#58534E] rounded-[10px]"
                                value={reviewDraft}
                                onChange={(e) => setReviewDraft(e.target.value)}
                                rows={8}
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    className="px-4 py-2 rounded-[10px] border border-[#C9C4BF]"
                                    onClick={handleCancelReview}
                                >
                                    취소
                                </button>
                                <button
                                    className="px-4 py-2 rounded-[10px] bg-[#58534E] text-white"
                                    onClick={handleSaveReview}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {reviewMemoId && (
                    <div className="flex flex-col px-[16px] py-[10px]">
                        <div
                            className={`rounded-[12px] p-[14px] bg-white border ${selectedReviews.includes(reviewMemoId)
                                ? "border-[#827A74] border-[1px]"
                                : "border-transparent"
                                }`}
                        >
                            <div
                                className="whitespace-pre-wrap"
                                onClick={() =>
                                    isSelectMode ? toggleSelect(reviewMemoId) : setIsReviewMemoEdit((prev) => !prev)
                                }
                            >
                                {memoDraft}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#F7F5F1]">
                <div className="w-full max-w-[520px] mx-auto px-[16px] py-[10px]">
                    <TextInput
                        type="text"
                        value={isReviewMemoEdit || !reviewMemoId ? memoDraft : ""}
                        onChange={(val) => setMemoDraft(val)}
                        onSubmit={reviewMemoId ? handleUpdateMemo : handleCreateMemo}
                    />
                </div>
            </div>
            {isUnderBarOpen && (
                <DeleteUnderBar
                    onDelete={handleMemoDelete}
                />
            )}
        </div>
    );
}
