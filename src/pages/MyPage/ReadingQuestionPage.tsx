import BookTitleLabel from "../../components/BookTitleLabel.tsx"
import Divider from "../../components/Divider.tsx"
import MenuBarItems from "../../components/MenuBarItems.tsx"
import Header from "../../components/Header.tsx"
import QuestionBox from "../../components/QuestionBox.tsx"
import { useEffect, useState } from 'react';
import { getMyQuestions, deleteQuestion, type MyQuestionItem } from "../../api/questionApi.ts";

const ReadingQuestionPage = () => {
    const [questions, setQuestions] = useState<MyQuestionItem[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const lastQuestion = questions[questions.length - 1];
                const lastId = lastQuestion ? lastQuestion.id : undefined;


                // lastBookTitle을 하드코딩, 예: 기본값을 "기본 책 제목"으로 설정
                const lastBookTitle = "기본 책 제목"; // 하드코딩된 값

                if (!lastBookTitle) {
                    console.error("lastBookTitle이 비어 있습니다. API 요청을 할 수 없습니다.");
                    return;  // lastBookTitle이 비어 있으면 요청을 보내지 않도록 처리
                }
                const response = await getMyQuestions({
                    size: 10,
                    lastId,
                    lastBookTitle,
                });
                setQuestions(response.result.questionList);
            } catch (error) {
                console.error('질문 목록 조회 실패:', error);
            }
        };

        fetchQuestions();
    }, []);

    // 책 제목을 추출하고, 해당 책 제목별로 질문을 나누어 렌더링
    const renderQuestionsByBook = () => {
        const bookTitles = Array.from(new Set(questions.map((q) => q.bookTitle))); // 중복 제거한 책 제목

        return bookTitles.map((bookTitle, index) => {
            const filteredQuestions = questions.filter((q) => q.bookTitle === bookTitle);

            return (
                <div key={bookTitle} className="w-full px-[16px] flex flex-col gap-[20px]">
                    <BookTitleLabel BookTitle={bookTitle} />



                    {filteredQuestions.map((item) => (
                        <QuestionBox
                            key={item.id}
                            question={item.content}
                            canEdit
                            canDelete
                            onEditAnswer={() => { console.log("답변 수정:", item.id) }}
                            onDeleteAnswer={() => { console.log("답변 삭제:", item.id) }}
                            onDeleteQuestion={() => handleDeleteQuestion(item.id)}  // 삭제 함수 호출
                        />
                    ))}


                </div>
            );
        });
    };

    // 질문 삭제 함수
    const handleDeleteQuestion = async (questionId: number) => {
        try {
            const response = await deleteQuestion(questionId);  // 질문 삭제 API 호출
            if (response.isSuccess) {
                // 삭제 성공 시 상태에서 해당 질문 제거
                setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
                console.log('질문 삭제 성공');
            } else {
                console.error('질문 삭제 실패');
            }
        } catch (error) {
            console.error('질문 삭제 오류:', error);
        }
    };


    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
            <Header />

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
                    MenuBarLabel="독서 질문"
                    plusMenuLabel="선택"
                />
                <Divider />
            </div>

            {/* 책 제목별로 구분된 질문 목록 렌더링 */}
            {renderQuestionsByBook()}
        </div>
    )
}

export default ReadingQuestionPage
