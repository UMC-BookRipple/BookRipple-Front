import BookTitleLabel from "../../components/BookTitleLabel.tsx"
import Divider from "../../components/Divider.tsx"
import MenuBarItems from "../../components/MenuBarItems.tsx"
import Header from "../../components/Header.tsx"
import AnswerBox from "../../components/AnswerBox.tsx"
import { useEffect, useState } from 'react';
import {
    getMyAnswers, deleteAnswer, type MyAnswerItem,
    updateAnswer,
} from "../../api/questionApi.ts";

const ReadingQuestionPage = () => {
    const [answers, setAnswers] = useState<MyAnswerItem[]>([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const lastQuestion = answers[answers.length - 1];
                const lastId = lastQuestion ? lastQuestion.answerId : undefined;


                // lastBookTitle을 하드코딩, 예: 기본값을 "기본 책 제목"으로 설정
                const lastBookTitle = "기본 책 제목"; // 하드코딩된 값

                if (!lastBookTitle) {
                    console.error("lastBookTitle이 비어 있습니다. API 요청을 할 수 없습니다.");
                    return;  // lastBookTitle이 비어 있으면 요청을 보내지 않도록 처리
                }
                const response = await getMyAnswers({
                    size: 10,
                    lastAnswerId: lastId,
                    lastBookTitle,
                });
                setAnswers(response.result.myAnswerList);
            } catch (error) {
                console.error('질문 목록 조회 실패:', error);
            }
        };

        fetchAnswers();
    }, []);

    // 책 제목을 추출하고, 해당 책 제목별로 질문을 나누어 렌더링
    const renderAnswersByBook = () => {
        const bookTitles = Array.from(new Set(answers.map((q) => q.bookTitle))); // 중복 제거한 책 제목

        return bookTitles.map((bookTitle) => {
            const filteredQuestions = answers.filter((q) => q.bookTitle === bookTitle);

            return (
                <div key={bookTitle} className="w-full px-[16px] flex flex-col gap-[20px]">
                    <BookTitleLabel BookTitle={bookTitle} />



                    {filteredQuestions.map((item) => (
                        <AnswerBox
                            key={item.answerId}
                            answer={item.answerContent}
                            canEdit
                            canDelete
                            onEditAnswer={(newContent) => handleEditAnswer(item.answerId, newContent)}

                            onDeleteAnswer={() => handleDeleteAnswer(item.answerId)}  // 삭제 함수 호출
                        />
                    ))}


                </div>
            );
        });
    };

    // 답변 삭제 함수
    const handleDeleteAnswer = async (answerId: number) => {
        try {
            const response = await deleteAnswer(answerId);  // 질문 삭제 API 호출
            if (response.isSuccess) {
                // 삭제 성공 시 상태에서 해당 질문 제거
                setAnswers((prevQuestions) => prevQuestions.filter((q) => q.answerId !== answerId));
                console.log('질문 삭제 성공');
            } else {
                console.error('질문 삭제 실패');
            }
        } catch (error) {
            console.error('질문 삭제 오류:', error);
        }
    };

    // 답변 수정 함수
    const handleEditAnswer = async (answerId: number, newContent: string) => {
        try {
            const response = await updateAnswer(answerId, { content: newContent });  // 답변 수정 API 호출
            if (response.isSuccess) {
                // 수정 성공 시 상태에서 해당 답변 업데이트
                setAnswers((prevAnswers) =>
                    prevAnswers.map((answer) =>
                        answer.answerId === answerId ? { ...answer, answerContent: newContent } : answer
                    )
                );
                console.log('답변 수정 성공');
            } else {
                console.error('답변 수정 실패');
            }
        } catch (error) {
            console.error('답변 수정 오류:', error);
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

            {renderAnswersByBook()}
        </div>
    )
}

export default ReadingQuestionPage