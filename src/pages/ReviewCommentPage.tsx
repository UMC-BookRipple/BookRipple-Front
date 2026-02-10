import { useState, useEffect, useMemo } from "react";
import BookTitleLabel from "../components/BookTitleLabel";
import Divider from "../components/Divider";
import EditUnderBar from "../components/EditUnderBar";
import MenuBarItems from "../components/MenuBarItems";
import Header from "../components/Header";
import ReviewCommentBox from "../components/ReviewCommentBox";
import { http } from "../types/http";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [comments, setComments] = useState<MyReviewList[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const idList: number[] = selectedIds;

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await http.get<MyReviewsApiResponse>(
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

      setComments(result?.myReviewList ?? []);
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const groupedByBook = useMemo(() => {
    return comments.reduce<Record<string, MyReviewList[]>>((acc, cur) => {
      if (!acc[cur.bookTitle]) acc[cur.bookTitle] = [];
      acc[cur.bookTitle].push(cur);
      return acc;
    }, {});
  }, [comments]);

  // 감상평 선택
  const toggleSelect = (id: number) => {
    if (!isSelectMode) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isUnderBarOpen = selectedIds.length > 0;

  const handleDelete = async () => {
    const id = selectedIds[0];
    if (!id) return;

    try {
      const response = await http.delete(
        `${import.meta.env.VITE_API_BASE_URL}/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const { isSuccess, message, code, result } = response.data;

      if (!isSuccess) {
        if (message) alert(message);
        return;
      }

      setComments((prev) => prev.filter((c) => c.id !== id));
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await http.post(
        `${import.meta.env.VITE_API_BASE_URL}/reviews/me/batch-delete`,
        { idList },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const { isSuccess, message } = response.data;

      if (!isSuccess) {
        if (message) alert(message);
        return;
      }

      setComments((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickReview = (item: MyReviewList) => {
    if (isSelectMode) {
      toggleSelect(item.id);
      return;
    }
    navigate(`/reviews/me/${item.id}`);
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
          onClickMain={() => navigate("/my-page/menu")}
          onClickPlus={() => {
            setIsSelectMode((prev) => !prev);
            setSelectedIds([]);
          }}
          isSelectMode={isSelectMode}
        />
        <Divider />
      </div>

      <div className="w-full px-[16px] flex flex-col gap-[20px]">
        {Object.entries(groupedByBook).map(([bookTitle, items]) => (
          <div key={bookTitle}>
            <BookTitleLabel BookTitle={bookTitle} />

            <div className="mt-[20px] flex flex-col gap-[20px]">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { isSelectMode ? toggleSelect(item.id) : handleClickReview(item) }}
                  className={`rounded-[12px] transition ${selectedIds.includes(item.id)
                    ? "border border-[#C9C4BF] bg-[#F3F1ED]"
                    : "border border-transparent"
                    }`}
                >
                  <ReviewCommentBox content={item.content} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isUnderBarOpen && (
        <EditUnderBar
          onSelectAll={() => setSelectedIds(comments.map((item) => item.id))}
          onDelete={selectedIds.length > 1 ? handleDeleteAll : handleDelete}
        />
      )}
    </div>
  );
};

export default ReviewCommentPage;
