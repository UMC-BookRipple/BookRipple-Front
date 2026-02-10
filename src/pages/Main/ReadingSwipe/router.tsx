import { Route, Navigate } from 'react-router-dom';
import ReadingMemoListPage from './ReadingMemoListPage';
import ReadingMemoWritePage from './ReadingMemoWritePage';
import ReadingQuestionListPage from './ReadingQuestionListPage';
import ReadingQuestionWritePage from './ReadingQuestionWritePage';
import ReadingQuestionOthersAnswer from './ReadingQuestionOthersAnswer';

export default function ReadingSwipeRouter() {
  return (
    <>
      {/* 독서 메모 목록 */}
      <Route path="/:bookId/memos" element={<ReadingMemoListPage />} />

      {/* 독서 메모 작성 */}
      <Route path="/:bookId/memos/new" element={<ReadingMemoWritePage />} />

      {/* 질문 목록 */}
      <Route path="/:bookId/questions" element={<ReadingQuestionListPage />} />

      {/* 질문 작성 */}
      <Route
        path="/:bookId/questions/new"
        element={<ReadingQuestionWritePage />}
      />

      {/* 다른 사람의 질문 답변 */}
      <Route
        path="/:questionId/answers"
        element={<ReadingQuestionOthersAnswer />}
      />

      {/* 404 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  );
}
