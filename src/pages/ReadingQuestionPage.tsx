import BookTitleLabel from "../components/BookTitleLabel"
import Divider from "../components/Divider"
import MenuBarItems from "../components/MenuBarItems"
import MyPageTopBar from "../components/MyPageTopBar"
import QuestionBox from "../components/QuestionBox"

const ReadingQuestionPage = () => {
    // 👉 나중에 API로 대체될 mock 데이터
    const questions = [
        {
            id: 1,
            question: "이 책을 읽게 된 계기는 무엇인가요?",
            answer: "표지와 제목이 인상 깊어서 읽게 되었어요.",
        },
        {
            id: 2,
            question: "가장 인상 깊었던 장면은?",
            answer: "주인공의 선택이 기억에 남아요.",
        },
        {
            id: 3,
            question: "이 책을 추천하고 싶은 사람은?",
            answer: "잔잔한 이야기를 좋아하는 사람에게요.",
        },
    ]

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
            <MyPageTopBar />

            {/* MY PAGE 라벨 */}
            <div className="w-full flex items-center px-[14px] pt-[30px]">
                <span className="h-[50px] flex items-center font-[GmarketSansBold] text-[20px]">
                    MY PAGE
                </span>
            </div>

            {/* 메뉴 영역 */}
            <div className="w-full flex flex-col py-[6px] px-[14px]">
                <Divider />
                <MenuBarItems
                    mainLabel="내 기록 확인"
                    MenuBarLabel="랜덤질문"
                    plusMenuLabel="선택"
                />
                <Divider />
            </div>

            <BookTitleLabel BookTitle="브람스를 좋아하세요..." />

            {/* 질문 리스트 */}
            <div className="w-full px-[16px] flex flex-col gap-[20px]">
                {questions.map((item) => (
                    <QuestionBox
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        canEdit
                        canDelete
                        onEditAnswer={() => {
                            console.log("답변 수정:", item.id)
                        }}
                        onDeleteAnswer={() => {
                            console.log("답변 삭제:", item.id)
                        }}
                        onDeleteQuestion={() => {
                            console.log("질문 삭제:", item.id)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReadingQuestionPage
