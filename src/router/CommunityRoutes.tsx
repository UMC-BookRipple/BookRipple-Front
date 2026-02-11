import { Route } from 'react-router-dom';

import CommunityPage from '../pages/Community/CommunityPage';
import BookCommunityPage from '../pages/Community/BookCommunityPage';
import RecommendWritePage from '../pages/Recommend/RecommendwritePage';
import RecommendCompletePage from '../pages/Recommend/RecommendCompletePage';
import RecommendBookSearchPage from '../pages/Recommend/RecommendBookSearchPage';

interface CommunityRoutesProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function CommunityRoutes({
  searchQuery,
  setSearchQuery,
}: CommunityRoutesProps) {
  return (
    <>
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
    </>
  );
}
