import { Route, Navigate } from 'react-router-dom';
import ReadingTimerPage from './ReadingTimerPage';
import ReadingPageRecordPage from './ReadingPageRecordPage';
import CompletePage from './CompletePage';
import NonCompletePage from './NonCompletePage';
import FinRandomQuestionPage from './FinRandomQuestionPage';
import ReviewWritePage from './ReviewWritePage';

export default function ReadingFlowRouter() {
  return (
    <>
      {/* 독서 타이머 */}
      <Route path="/:bookId/reading/timer" element={<ReadingTimerPage />} />

      {/* 페이지 기록 */}
      <Route
        path="/:bookId/reading/pages"
        element={<ReadingPageRecordPage />}
      />

      {/* 완독 페이지 */}
      <Route path="/:bookId/complete" element={<CompletePage />} />

      {/* 미완독 페이지 */}
      <Route path="/:bookId/non-complete" element={<NonCompletePage />} />

      {/* 랜덤 질문 */}
      <Route
        path="/:bookId/random-question"
        element={<FinRandomQuestionPage />}
      />

      {/* 감상평 작성 */}
      <Route path="/:bookId/review/new" element={<ReviewWritePage />} />

      {/* 404 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  );
}
