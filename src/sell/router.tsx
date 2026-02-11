import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import CommunityPage from "../pages/Community/CommunityPage";
import BookCommunityPage from "../pages/Community/BookCommunityPage";
import RecommendWritePage from "../pages/Recommend/RecommendwritePage";
import RecommendCompletePage from "../pages/Recommend/RecommendCompletePage";
import RecommendBookSearchPage from "../pages/Recommend/RecommendBookSearchPage";
import RecommendBookPage from "../pages/RecommendBookPage";
import ReadingQuestionPage from "../pages/ReadingQuestionPage";
import ReadingAnswerPage from "../pages/ReadingAnswerPage";

const AppRouter = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Routes>
            <Route path="/community" element={<CommunityPage />} />

            <Route
                path="/community/book/:bookId"
                element={<BookCommunityPage />}
            />

            <Route
                path="/recommend/write"
                element={<RecommendWritePage />}
            />

            <Route
                path="/recommend/complete"
                element={<RecommendCompletePage />}
            />

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

            <Route
                path="/my/recommend"
                element={<RecommendBookPage />}
            />

            <Route
                path="/my/question"
                element={<ReadingQuestionPage />}
            />

            <Route
                path="/my/answer"
                element={<ReadingAnswerPage />}
            />
        </Routes>
    );
};

export default AppRouter;
