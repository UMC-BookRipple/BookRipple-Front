import { useState, useEffect, useMemo } from "react";
import BookTitleLabel from "../components/BookTitleLabel";
import Divider from "../components/Divider";
import EditUnderBar from "../components/EditUnderBar";
import MenuBarItems from "../components/MenuBarItems";
import Header from "../components/Header";
import ReviewCommentBox from "../components/ReviewCommentBox";
import TextInput from "../components/TextInput";
import axios from "axios";

interface MyReviewList {
    id: number;
    bookTitle: string;
    content: string;
    updatedAt: string;
    createdAt?: string;
}

interface MyReviewsApiResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result?: {
        myReviewList?: MyReviewList[] | null;
        hasNext: boolean;
        lastBookTitle: string;
        lastId: number;
    };
}

const ReviewCommentPage = () => {
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<MyReviewList[]>([]);

    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get<MyReviewsApiResponse>(
                `${import.meta.env.VITE_API_BASE_URL}/reviews/me`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                }
            );

            const { isSuccess, message, result } = response.data;

            if (!isSuccess) {
                if (message) alert(message);
                return;
            }

            // 서버 응답 리스트 세팅
            setComments(result?.myReviewList ?? []);
            // 데이터 새로 불러오면 선택 초기화(혼동 방지)
            setSelectedIds([]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    /**
     * ✅ 같은 bookTitle끼리 묶어서 렌더링 (제목은 1번만 보여주기)
     */
    const groupedByBook = useMemo(() => {
        return comments.reduce<Record<string, MyReviewList[]>>((acc, cur) => {
            if (!acc[cur.bookTitle]) acc[cur.bookTitle] = [];
            acc[cur.bookTitle].push(cur);
            return acc;
        }, {});
    }, [comments]);

    /**
     * ✅ 감상평 클릭 시 선택/해제 토글
     * - 같은 감상평 다시 클릭하면 선택 해제 -> 선택이 0개가 되면 UnderBar 내려감
     * - 다른 감상평 여러 개 선택 가능 (다중 선택)
     */
    const toggleSelect = (id: number) => {
        setSelectedIds((prev) => {
            const exists = prev.includes(id);
            if (exists) return prev.filter((x) => x !== id);
            return [...prev, id];
        });
    };

    /**
     * ✅ UnderBar 노출 여부
     */
    const isUnderBarOpen = selectedIds.length > 0;

    /**
     * ✅ 수정하기 가능 여부: 1개만 선택된 경우만 가능
     * - 여러 개 선택된 경우 UnderBar는 내려가지 않지만 수정은 불가
     */
    const canEdit = selectedIds.length === 1;

    /**
     * ✅ [토대] 수정하기 버튼 클릭 시
     * - 실제 API 연결/페이지 이동은 TODO로 남겨둠
     */
    const handleEdit = async () => {
        if (!canEdit) return; // 여러 개 선택이면 수정 불가

        const targetId = selectedIds[0];

        // TODO 1) 수정 페이지로 이동하거나(modal/open)
        // 예) navigate(`/reviews/${targetId}/edit`)
        // TODO 2) 또는 상세 조회 API로 내용 가져와서 입력창에 세팅 등

        console.log("수정 대상 id:", targetId);
    };

    /**
     * ✅ [토대] 삭제하기 버튼 클릭 시
     * - 여러 개 선택 가능
     * - 실제 API 연결은 TODO로 남겨둠
     */
    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        const idsToDelete = [...selectedIds];

        // ✅ UI 즉시 반영(optimistic) — 원하면 API 성공 후에 반영하도록 바꿔도 됨
        setComments((prev) => prev.filter((item) => !idsToDelete.includes(item.id)));
        setSelectedIds([]); // 삭제 후 UnderBar 내려감

        // TODO: 삭제 API 연결 (예시)
        // await axios.delete(`${BASE_URL}/reviews`, { data: { ids: idsToDelete }, headers: ... })
        console.log("삭제 대상 ids:", idsToDelete);
    };

    const handleSubmit = (v: string) => {
        console.log("제출된 내용:", v);
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
            <Header />

            <div className="w-full flex items-center px-[14px] pt-[30px]">
                <span className="h-[50px] flex items-center font-[GmarketSansBold] text-[20px]">
                    MY PAGE
                </span>
            </div>

            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems
                    mainLabel="내 기록 확인"
                    MenuBarLabel="독서 메모"
                    plusMenuLabel="선택"
                />
                <Divider />
            </div>

            {/* ✅ 그룹(책)끼리 간격 */}
            <div className="w-full px-[16px] flex flex-col gap-[20px]">
                {Object.entries(groupedByBook).map(([bookTitle, items]) => (
                    // ✅ key 경고 해결: 그룹 최상위 요소에 key
                    <div key={bookTitle}>
                        <BookTitleLabel BookTitle={bookTitle} />

                        {/* ✅ 같은 책 안의 리뷰 박스끼리도 gap 적용 */}
                        <div className="mt-[20px] flex flex-col gap-[20px]">
                            {items.map((item) => (
                                // ✅ key 경고 해결: items.map 최상위 요소에도 key
                                <div
                                    key={item.id}
                                    onClick={() => toggleSelect(item.id)}
                                    className={`rounded-[12px] transition
    ${selectedIds.includes(item.id)
                                            ? "border border-[#C9C4BF] bg-[#F3F1ED]"
                                            : "border border-transparent"
                                        }
  `}
                                >
                                    <ReviewCommentBox content={item.content} />
                                </div>

                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ 입력창: UnderBar가 열려있을 때는 숨김(기존 로직 유지) */}
            {!isUnderBarOpen && (
                <div className="fixed right-0 bottom-0 left-0 z-10 bg-[#F7F5F1] px-[16px] pt-[10px] pb-[20px]">
                    <TextInput
                        value={input}
                        onChange={setInput}
                        onSubmit={(v) => {
                            handleSubmit(v);
                            setInput("");
                        }}
                    />
                </div>
            )}

            {isUnderBarOpen && (
                <EditUnderBar
                    onSelectAll={() => {
                        setSelectedIds(comments.map((item) => item.id));
                    }}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default ReviewCommentPage;
