import BookTitleLabel from "../components/BookTitleLabel";
import Divider from "../components/Divider";
import MenuBarItems from "../components/MenuBarItems";
import Header from "../components/Header";
import MyRecordBox from "../components/MyRecordBox";
import {
    getMyRecommendations,
    updateRecommendation,
    deleteRecommendation,
} from "../api/recommend";
import { useEffect, useState, useCallback } from "react";
import { type MyRecommendation } from "../api/recommend";

const RecommendBookPage = () => {
    const [records, setRecords] = useState<MyRecommendation[]>([]);
    const [loading, setLoading] = useState(true);

    // 페이징
    const [lastId, setLastId] = useState<number | null>(null);
    const [lastSourceBookTitle, setLastSourceBookTitle] = useState<string | null>(null);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const res = await getMyRecommendations(lastId ?? undefined, lastSourceBookTitle ?? undefined);

            setRecords((prevRecords) => {
                const newRecords = res.myRecommendList.filter((newRecord) =>
                    !prevRecords.some((existingRecord) => existingRecord.id === newRecord.id)
                );
                return [...prevRecords, ...newRecords];
            });

            setLastId(res.lastId);
            setLastSourceBookTitle(res.lastSourceBookTitle);
        } catch (error) {
            console.error("추천글 조회 실패", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleEdit = async (recordId: number, newContent: string) => {
        try {
            await updateRecommendation(recordId, { content: newContent });
            setRecords((prev) =>
                prev.map((r) => (r.id === recordId ? { ...r, content: newContent } : r))
            );
        } catch (error) {
            console.error("추천글 수정 실패", error);
        }
    };

    const handleDelete = async (recordId: number) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deleteRecommendation(recordId);
            setRecords((prev) => prev.filter((r) => r.id !== recordId));
        } catch (error) {
            console.error("추천글 삭제 실패", error);
        }
    };

    const renderRecordsByBook = () => {
        const bookTitles = Array.from(new Set(records.map((r) => r.sourceBookTitle)));

        return bookTitles.map((bookTitle) => {
            const filteredRecords = records.filter((r) => r.sourceBookTitle === bookTitle);

            return (
                <div key={bookTitle} className="w-full px-[16px] flex flex-col gap-[20px]">
                    <BookTitleLabel BookTitle={bookTitle} />

                    {filteredRecords.map((item) => (
                        <MyRecordBox
                            key={`${item.id}-${item.updatedAt}-${item.targetBookTitle}`}
                            bookName={item.targetBookTitle}
                            content={item.content}
                            canEdit
                            canDelete
                            onEdit={(newContent) => handleEdit(item.id, newContent)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}


                </div>
            );
        });
    };

    const handleScroll = useCallback(() => {
        const bottom = document.documentElement.scrollHeight ===
            document.documentElement.scrollTop + window.innerHeight;

        if (bottom && !loading && records.length > 0) {
            fetchRecords();
        }
    }, [loading, records]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

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
                    MenuBarLabel="추천 도서"
                    plusMenuLabel="선택"
                />
                <Divider />
            </div>

            <div className="w-full px-[16px] flex flex-col gap-[20px]">
                {loading && <p>로딩 중...</p>}
                {!loading && records.length === 0 && <p>추천글이 없습니다.</p>}
                {renderRecordsByBook()}
            </div>
        </div>
    );
};

export default RecommendBookPage;
