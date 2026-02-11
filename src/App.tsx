import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import GlobalSpinner from './components/common/GlobalSpinner';
import HomeRoute from './components/HomeRoute';
import BookShelfSearchPage from './pages/Main/Bookshelf/BookShelfSearchPage';
import BookshelfRouter from './pages/Main/Bookshelf/router';
import BlindBookRouter from './pages/blindBook/router';

// Auth
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
import NotificationPage from './pages/Notification/NotificationPage';

// Reading Flow + Swipe
import ReadingTimerPage from './pages/Main/ReadingFlow/ReadingTimerPage';
import NonCompletePage from './pages/Main/ReadingFlow/NonCompletePage';
import ReviewWritePage from './pages/Main/ReadingFlow/ReviewWritePage';
import ReadingMemoListPage from './pages/Main/ReadingSwipe/ReadingMemoListPage';
import ReadingMemoWritePage from './pages/Main/ReadingSwipe/ReadingMemoWritePage';
import ReadingQuestionListPage from './pages/Main/ReadingSwipe/ReadingQuestionListPage';
import ReadingQuestionWritePage from './pages/Main/ReadingSwipe/ReadingQuestionWritePage';
import ReadingQuestionOthersAnswer from './pages/Main/ReadingSwipe/ReadingQuestionOthersAnswer';
import ReadingPageRecordPage from './pages/Main/ReadingFlow/ReadingPageRecordPage';
import CompletePage from './pages/Main/ReadingFlow/CompletePage';
import FinRandomQuestionPage from './pages/Main/ReadingFlow/FinRandomQuestionPage';

// Community + Recommend
import CommunityPage from './pages/Community/CommunityPage';
import BookCommunityPage from './pages/Community/BookCommunityPage';
import RecommendWritePage from './pages/Recommend/RecommendwritePage';
import RecommendCompletePage from './pages/Recommend/RecommendCompletePage';
import RecommendBookSearchPage from './pages/Recommend/RecommendBookSearchPage';

// MyPage
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
import MyReadingMemoPage from './pages/MyPage/MyReadingMemoPage';
import RecommendBookPage from './pages/MyPage/RecommendBookPage';
import ReadingAnswerPage from './pages/MyPage/ReadingAnswerPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <GlobalSpinner />
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<HomeRoute />} />

        {/* Bookshelf Routes */}
        <Route path="/bookshelf/*" element={<BookshelfRouter />} />
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

        {/* BlindBook Routes */}
        <Route path="/blind-book/*" element={<BlindBookRouter />} />

        {/* Reading Flow */}
        <Route
          path="/books/:bookId/reading/timer"
          element={<ReadingTimerPage />}
        />
        <Route
          path="/books/:bookId/reading/pages"
          element={<ReadingPageRecordPage />}
        />
        <Route path="/books/:bookId/complete" element={<CompletePage />} />
        <Route
          path="/books/:bookId/non-complete"
          element={<NonCompletePage />}
        />
        <Route
          path="/books/:bookId/random-question"
          element={<FinRandomQuestionPage />}
        />
        <Route path="/books/:bookId/review/new" element={<ReviewWritePage />} />

        {/* Reading Swipe */}
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

        {/* Community */}
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/book/:bookId" element={<BookCommunityPage />} />

        {/* Recommend */}
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

        {/* Auth Routes */}
        <Route path="/start" element={<StartPage />} />
        <Route path="/oauth/kakao" element={<KakaoRedirect />} />
        <Route path="/auth/login/local" element={<LoginPage />} />
        <Route path="/signup/step1" element={<SignupPage />} />
        <Route path="/signup/step2" element={<SignupPage2 />} />
        <Route path="/signup/step3" element={<SignupPage3 />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />
        <Route path="/find/menu" element={<FindPage />} />
        <Route path="/find-id/email/send" element={<FindIdPage />} />
        <Route
          path="/find-password/email/send"
          element={<FindPasswordPage />}
        />
        <Route path="/find-password/reset" element={<ResetPasswordPage />} />
        <Route path="/policy" element={<PolicyPage />} />

        {/* Notification */}
        <Route path="/notification" element={<NotificationPage />} />

        {/* MyPage Routes (Protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/edit/menu" element={<EditMenuPage />} />
          <Route path="/profile/edit/id" element={<ProfileEditIdPage />} />
          <Route path="/profile/edit/pw" element={<ProfileEditPwPage />} />
          <Route path="/members/me/login-id" element={<IdEditPage />} />
          <Route path="/members/me/password" element={<PasswordEditPage />} />
          <Route path="/my-page/menu" element={<MyPageMenuPage />} />
          <Route path="/questions/me" element={<ReadingQuestionPage />} />
          <Route path="/reviews/me" element={<ReviewCommentPage />} />
          <Route path="/reviews/me/:reviewId" element={<ReviewDetailPage />} />
          <Route path="/memos/me" element={<MyReadingMemoPage />} />
          <Route path="/members/me/records" element={<ReadingRecordPage />} />
          <Route path="/mypage/memo" element={<MyReadingMemoPage />} />
          <Route path="/mypage/recommend" element={<RecommendBookPage />} />
          <Route path="/answer/me" element={<ReadingAnswerPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
