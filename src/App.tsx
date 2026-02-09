import { Routes, Route, Navigate } from 'react-router-dom';

import ReadingTimerPage from './pages/ReadingFlow/ReadingTimerPage';
import NonCompletePage from './pages/ReadingFlow/NonCompletePage';
import ReviewWritePage from './pages/ReadingFlow/ReviewWritePage';
import ReadingMemoListPage from './pages/ReadingSwipe/ReadingMemoListPage';
import ReadingMemoWritePage from './pages/ReadingSwipe/ReadingMemoWritePage';
import ReadingQuestionListPage from './pages/ReadingSwipe/ReadingQuestionListPage';
import ReadingQuestionWritePage from './pages/ReadingSwipe/ReadingQuestionWritePage';
import ReadingQuestionOthersAnswer from './pages/ReadingSwipe/ReadingQuestionOthersAnswer';
import BookshelfSelectPage from './pages/bookshelf/BookshelfSelectPage';
import BookshelfPage from './pages/bookshelf/BookshelfPage';
import MyReadingMemoPage from './pages/MyReadingMemoPage';
import ReadingPageRecordPage from './pages/ReadingFlow/ReadingPageRecordPage';
import CompletePage from './pages/ReadingFlow/CompletePage';
import FinRandomQuestionPage from './pages/ReadingFlow/FinRandomQuestionPage';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/books/1/reading/timer" replace />}
      />

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

      <Route path="/mypage/memo" element={<MyReadingMemoPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
