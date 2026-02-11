import { Route } from 'react-router-dom';

import ReadingTimerPage from '../pages/Main/ReadingFlow/ReadingTimerPage';
import NonCompletePage from '../pages/Main/ReadingFlow/NonCompletePage';
import ReviewWritePage from '../pages/Main/ReadingFlow/ReviewWritePage';
import ReadingMemoListPage from '../pages/Main/ReadingSwipe/ReadingMemoListPage';
import ReadingMemoWritePage from '../pages/Main/ReadingSwipe/ReadingMemoWritePage';
import ReadingQuestionListPage from '../pages/Main/ReadingSwipe/ReadingQuestionListPage';
import ReadingQuestionWritePage from '../pages/Main/ReadingSwipe/ReadingQuestionWritePage';
import ReadingQuestionOthersAnswer from '../pages/Main/ReadingSwipe/ReadingQuestionOthersAnswer';
import ReadingPageRecordPage from '../pages/Main/ReadingFlow/ReadingPageRecordPage';
import CompletePage from '../pages/Main/ReadingFlow/CompletePage';
import FinRandomQuestionPage from '../pages/Main/ReadingFlow/FinRandomQuestionPage';

export default function ReadingRoutes() {
  return (
    <>
      {/* Reading Flow
      (Timer -> PageRecord -> Non/Complete -> RandomQuestion -> Review) */}
      <Route
        path="/books/:bookId/reading/timer"
        element={<ReadingTimerPage />}
      />
      <Route
        path="/books/:bookId/reading/pages"
        element={<ReadingPageRecordPage />}
      />
      <Route path="/books/:bookId/complete" element={<CompletePage />} />
      <Route path="/books/:bookId/non-complete" element={<NonCompletePage />} />
      <Route
        path="/books/:bookId/random-question"
        element={<FinRandomQuestionPage />}
      />
      <Route path="/books/:bookId/review/new" element={<ReviewWritePage />} />

      {/* Reading Swipe
      (Timer Left : MemoList + MemoWrite)
      (Timer Right : QuestionList + QuestionWrite + OthersAnswer )*/}
      <Route path="/books/:bookId/memos" element={<ReadingMemoListPage />} />
      <Route
        path="/books/:bookId/memos/new"
        element={<ReadingMemoWritePage />}
      />
      <Route
        path="/books/:bookId/questions"
        element={<ReadingQuestionListPage />}
      />
      <Route
        path="/books/:bookId/questions/new"
        element={<ReadingQuestionWritePage />}
      />
      <Route
        path="/questions/:questionId/answers"
        element={<ReadingQuestionOthersAnswer />}
      />
    </>
  );
}
