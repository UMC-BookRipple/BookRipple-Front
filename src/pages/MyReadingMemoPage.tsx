import BookTitleLabel from "../components/BookTitleLabel"
import Divider from "../components/Divider"
import MenuBarItems from "../components/MenuBarItems"
import MyPageTopBar from "../components/MyPageTopBar"
import MyRecordBox from "../components/MyRecordBox"

const MyReadingMemoPage = () => {
    // 👉 추후 API로 교체될 mock 데이터
    const records = [
        {
            id: 1,
            bookName: "브람스를 좋아하세요...",
            content: "이 장면에서 주인공의 감정 변화가 인상 깊었다.",
        },
        {
            id: 2,
            bookName: "브람스를 좋아하세요...",
            content: "문장이 잔잔해서 계속 곱씹게 된다.",
        },
        {
            id: 3,
            bookName: "브람스를 좋아하세요...",
            content: "다시 읽어보고 싶은 책.",
        },
    ]

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
            <MyPageTopBar />

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

            {/* 기록 리스트 */}
            <div className="w-full px-[16px] flex flex-col gap-[20px]">
                {records.map((record) => (
                    <MyRecordBox
                        key={record.id}
                        bookName={record.bookName}
                        content={record.content}
                        canEdit
                        canDelete
                        onEdit={() => {
                            console.log("메모 수정:", record.id)
                        }}
                        onDelete={() => {
                            console.log("메모 삭제:", record.id)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default MyReadingMemoPage
