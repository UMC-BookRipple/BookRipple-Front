import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import CommunityPage from '../pages/Community/CommunityPage';
import BookCommunityPage from '../pages/Community/BookCommunityPage';
import RecommendWritePage from '../pages/Main/ReadingFlow/Recommend/RecommendwritePage';
import RecommendCompletePage from '../pages/Main/ReadingFlow/Recommend/RecommendCompletePage';
import RecommendBookSearchPage from '../pages/Main/ReadingFlow/Recommend/RecommendBookSearchPage';

const AppRouter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Routes>
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
};

export default AppRouter;
