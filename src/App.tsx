import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Bookshelf pages
import BookshelfPage from './pages/Main/Bookshelf/BookshelfPage';
import BookshelfSelectPage from './pages/Main/Bookshelf/BookshelfSelectPage';
import BookShelfSearchPage from './pages/Main/Bookshelf/BookShelfSearchPage';

// Reading Flow pages
import ReadingTimerPage from './pages/Main/ReadingFlow/ReadingTimerPage';
import ReadingPageRecordPage from './pages/Main/ReadingFlow/ReadingPageRecordPage';
import CompletePage from './pages/Main/ReadingFlow/CompletePage';
import NonCompletePage from './pages/Main/ReadingFlow/NonCompletePage';
import FinRandomQuestionPage from './pages/Main/ReadingFlow/FinRandomQuestionPage';
import ReviewWritePage from './pages/Main/ReadingFlow/ReviewWritePage';

// Reading Swipe pages
import ReadingMemoListPage from './pages/Main/ReadingSwipe/ReadingMemoListPage';
import ReadingMemoWritePage from './pages/Main/ReadingSwipe/ReadingMemoWritePage';
import ReadingQuestionListPage from './pages/Main/ReadingSwipe/ReadingQuestionListPage';
import ReadingQuestionWritePage from './pages/Main/ReadingSwipe/ReadingQuestionWritePage';
import ReadingQuestionOthersAnswer from './pages/Main/ReadingSwipe/ReadingQuestionOthersAnswer';

// Other pages
import MyReadingMemoPage from './pages/MyReadingMemoPage';
import RecommendBookSearchPage from './pages/Recommend/RecommendBookSearchPage';
import NotificationPage from './pages/Notification/NotificationPage';

// Community pages
import CommunityPage from './pages/Community/CommunityPage';
import BookCommunityPage from './pages/Community/BookCommunityPage';

// Blind Book router
import BlindBookRouter from './pages/blindBook/router';

// MyPage pages
import MyPageMenuPage from './pages/MyPageMenuPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ReadingRecordPage from './pages/ReadingRecordPage';

// Wrapper for Search Page to provide required props
const SearchPageWrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <RecommendBookSearchPage
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onBack={() => navigate(-1)}
    />
  );
};

// Wrapper for Bookshelf Search Page
const BookShelfSearchPageWrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <BookShelfSearchPage
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onBack={() => navigate(-1)}
    />
  );
};

export default function App() {
  return (
    <Routes>
      {/* 기본 경로 - 책장으로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/bookshelf/reading" replace />} />

      {/* 책장 도메인 */}
      <Route path="/bookshelf" element={<BookshelfPage />} />
      <Route path="/bookshelf/:tab" element={<BookshelfPage />} />
      <Route
        path="/bookshelf/:tab/select/:bookId"
        element={<BookshelfSelectPage />}
      />
      <Route
        path="/bookshelf/search"
        element={<BookShelfSearchPageWrapper />}
      />

      {/* 독서 플로우 도메인 (Reading Flow) */}
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

      {/* 독서 스와이프 도메인 (Reading Swipe - Memos & Questions) */}
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

      {/* 마이페이지 - 독서 메모 */}
      <Route path="/mypage/memo" element={<MyReadingMemoPage />} />

      {/* 검색 페이지 */}
      <Route path="/search" element={<SearchPageWrapper />} />

      {/* 알림 페이지 */}
      <Route path="/notification" element={<NotificationPage />} />

      {/* 커뮤니티 도메인 */}
      <Route
        path="/community"
        element={<Navigate to="/community/qna" replace />}
      />
      <Route path="/community/qna" element={<CommunityPage />} />
      <Route path="/community/reviews" element={<CommunityPage />} />
      <Route path="/community/recommendations" element={<CommunityPage />} />
      {/* 특정 책의 커뮤니티 페이지 */}
      <Route path="/community/book/:bookId" element={<BookCommunityPage />} />

      {/* 블라인드 북 도메인 */}
      <Route path="/blind-book/*" element={<BlindBookRouter />} />

      {/* 마이페이지 도메인 */}
      <Route path="/mypage" element={<MyPageMenuPage />} />
      <Route path="/mypage/profile" element={<ProfileEditPage />} />
      <Route path="/mypage/records" element={<ReadingRecordPage />} />

      {/* 404 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
