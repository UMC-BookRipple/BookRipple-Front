import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import ReadingTimerPage from './pages/Main/ReadingFlow/ReadingTimerPage';
import NonCompletePage from './pages/Main/ReadingFlow/NonCompletePage';
import ReviewWritePage from './pages/Main/ReadingFlow/ReviewWritePage';
import ReadingMemoListPage from './pages/Main/ReadingSwipe/ReadingMemoListPage';
import ReadingMemoWritePage from './pages/Main/ReadingSwipe/ReadingMemoWritePage';
import ReadingQuestionListPage from './pages/Main/ReadingSwipe/ReadingQuestionListPage';
import ReadingQuestionWritePage from './pages/Main/ReadingSwipe/ReadingQuestionWritePage';
import ReadingQuestionOthersAnswer from './pages/Main/ReadingSwipe/ReadingQuestionOthersAnswer';
import MyReadingMemoPage from './pages/MyPage/MyReadingMemoPage';
import ReadingPageRecordPage from './pages/Main/ReadingFlow/ReadingPageRecordPage';
import CompletePage from './pages/Main/ReadingFlow/CompletePage';
import FinRandomQuestionPage from './pages/Main/ReadingFlow/FinRandomQuestionPage';
import StartPage from './pages/Login/StartPage';
import KakaoRedirect from './layouts/kakaoRedirect';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Login/SignupPage';
import SignupPage2 from './pages/Login/SignupPage2';
import SignupPage3 from './pages/Login/SignupPage3';
import SignupCompletePage from './pages/Login/SignupCompletePage';
import FindPage from './pages/Login/FindPage';
import FindIdPage from './pages/Login/FIndIdPage';
import FindPasswordPage from './pages/Login/FindPasswordPage';
import ResetPasswordPage from './pages/MyPage/ResetPasswordPage';
import PolicyPage from './pages/Login/PolicyPage';
import ProtectedRoute from './components/ProtectedRoute';
import EditMenuPage from './pages/MyPage/EditMenuPage';
import ProfileEditIdPage from './pages/MyPage/ProfileEditIdPage';
import ProfileEditPwPage from './pages/MyPage/ProfileEditPwPage';
import IdEditPage from './pages/MyPage/IdEditPage';
import PasswordEditPage from './pages/MyPage/PasswordEditPage';
import MyPageMenuPage from './pages/MyPage/MyPageMenuPage';
import ReadingQuestionPage from './pages/MyPage/ReadingQuestionPage';
import ReviewCommentPage from './pages/MyPage/ReviewCommentPage';
import ReviewDetailPage from './pages/MyPage/ReviewDetailPage';
import ReadingRecordPage from './pages/MyPage/ReadingRecordPage';
import GlobalSpinner from './components/common/GlobalSpinner';

import CommunityPage from './pages/Community/CommunityPage';
import BookCommunityPage from './pages/Community/BookCommunityPage';
import RecommendWritePage from './pages/Recommend/RecommendwritePage';
import RecommendCompletePage from './pages/Recommend/RecommendCompletePage';
import RecommendBookSearchPage from './pages/Recommend/RecommendBookSearchPage';
import BookShelfSearchPage from './pages/Main/Bookshelf/BookShelfSearchPage';
import BookshelfPage from './pages/Main/Bookshelf/BookshelfPage';
import BookshelfSelectPage from './pages/Main/Bookshelf/BookshelfSelectPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Routes>
      {/* Bookshelf */}
      <Route
        path="/bookshelf"
        element={<Navigate to="/bookshelf/reading" replace />}
      />
      <Route path="/bookshelf/:tab" element={<BookshelfPage />} />
      <Route
        path="/bookshelf/:tab/select/:bookId"
        element={<BookshelfSelectPage />}
      />
      <Route
        path="/bookshelf/search"
        element={
          <BookShelfSearchPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onBack={() => window.history.back()}
          />
        }
      />

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

      {/* Community / Recommend */}
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/book/:bookId" element={<BookCommunityPage />} />
      <Route path="/recommend/write" element={<RecommendWritePage />} />
      <Route path="/recommend/complete" element={<RecommendCompletePage />} />
      <Route
        path="/recommend/search"
        element={
          <RecommendBookSearchPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onBack={() => window.history.back()}
          />
        }
      />
    </Routes>
  );
}
