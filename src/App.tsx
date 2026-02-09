import { Routes, Route, Navigate } from 'react-router-dom';

import ReadingTimerPage from './pages/ReadingFlow/ReadingTimerPage';
import ReadingPageRecordPage from './pages/ReadingFlow/ReadingPageRecordPage';
import NonCompletePage from './pages/ReadingFlow/NonCompletePage';
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
