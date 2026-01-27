import { useState } from "react"
import BookTitleLabel from "../components/BookTitleLabel"
import Divider from "../components/Divider"
import EditUnderBar from "../components/EditUnderBar"
import MenuBarItems from "../components/MenuBarItems"
import Header from "../components/Header"
import ReviewCommentBox from "../components/ReviewCommentBox"
import TextInput from "../components/TextInput"

const MyReadingMemoPage = () => {
    // 👉 추후 API로 교체될 mock 데이터
    const reviewComments = [
        {
            id: 1,
            content: "설렘보다는 망설임에 가깝고,",
        },
        {
            id: 2,
            content: "문장이 잔잔해서 오래 남는다.",
        },
        {
            id: 3,
            content: "다시 읽고 싶은 책이다.",
        },
    ]

    const [isDelete, setIsDelete] = useState(false);
    const onDelete = () => {
        setIsDelete(prev => !prev);
    }

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
            <Header />

            {/* MY PAGE */}
            <div className="w-full flex items-center px-[14px] pt-[30px]">
                <span className="h-[50px] flex items-center font-[GmarketSansBold] text-[20px]">
                    MY PAGE
                </span>
            </div>

            {/* 메뉴 */}
            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems
                    mainLabel="내 기록 확인"
                    MenuBarLabel="독서 메모"
                    plusMenuLabel="선택"
                />
                <Divider />
            </div>

            <BookTitleLabel BookTitle="브람스를 좋아하세요..." />

            {/* 리뷰 댓글 리스트 */}
            <div className="w-full px-[16px] flex flex-col gap-[20px]" onClick={onDelete}>
                {reviewComments.map((reviewComment) => (
                    <ReviewCommentBox
                        key={reviewComment.id}
                        content={reviewComment.content}
                    />
                ))}
            </div>
            {!isDelete && (
                <TextInput />
            )}
            {isDelete && (
                <EditUnderBar />
            )}
        </div>
    )
}

export default MyReadingMemoPage
