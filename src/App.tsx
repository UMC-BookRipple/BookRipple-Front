import { BrowserRouter, Routes, Route } from "react-router-dom";

import CommunityPage from "./pages/Community/CommunityPage";
import BookCommunityPage from "./pages/Community/BookCommunityPage.tsx";
import RecommendWritePage from "./pages/Recommend/RecommendwritePage.tsx";
import RecommendCompletePage from "./pages/Recommend/RecommendCompletePage.tsx";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/community" element={<CommunityPage />} />

        <Route path="/community/book/:bookId" element={<BookCommunityPage />} />

        <Route path="/recommend/write" element={<RecommendWritePage />} />

        <Route path="/recommend/complete" element={<RecommendCompletePage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

