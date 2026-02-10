// router/index.tsx (예시)
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import StartPage from "../pages/StartPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import SignupPage2 from "../pages/SignupPage2";
import SignupPage3 from "../pages/SignupPage3";
import SignupCompletePage from "../pages/SignupCompletePage";

import IdEditPage from "../pages/IdEditPage";
import PasswordEditPage from "../pages/PasswordEditPage";
import ReadingQuestionPage from "../pages/ReadingQuestionPage";
import MyReadingMemoPage from "../pages/MyReadingMemoPage";
import EditMenuPage from "../pages/EditMenuPage";
import MyPageFindPage from "../pages/FindPage";

import KakaoRedirect from "../layouts/kakaoRedirect";
import FindIdPage from "../pages/FIndIdPage";
import FindPasswordPage from "../pages/FindPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import PolicyPage from "../pages/PolicyPage";
import ProfileEditIdPage from "../pages/ProfileEditIdPage";
import ProfileEditPwPage from "../pages/ProfileEditPwPage";
import MyPageMenuPage from "../pages/MyPageMenuPage";
import ReviewCommentPage from "../pages/ReviewCommentPage";
import ReadingRecordPage from "../pages/ReadingRecordPage";
import ReviewDetailPage from "../pages/ReviewDetailPage";
import GlobalSpinner from "../components/common/GlobalSpinner";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <GlobalSpinner />
            <Route path="/" element={<StartPage />} />
            <Route path="/oauth/kakao" element={<KakaoRedirect />} />
            <Route path="/auth/login/local" element={<LoginPage />} />

            <Route path="/signup/step1" element={<SignupPage />} />
            <Route path="/signup/step2" element={<SignupPage2 />} />
            <Route path="/signup/step3" element={<SignupPage3 />} />
            <Route path="/signup/complete" element={<SignupCompletePage />} />

            <Route path="/find/menu" element={<MyPageFindPage />} />
            <Route path="/find-id/email/send" element={<FindIdPage />} />
            <Route path="/find-password/email/send" element={<FindPasswordPage />} />
            <Route path="/find-password/reset" element={<ResetPasswordPage />} />
            <Route path="/policy" element={<PolicyPage />} />

            {/* protected (로그인 필요) */}
            <Route element={<ProtectedRoute />}>
                <Route path="/profile/edit/menu" element={<EditMenuPage />} />
                <Route path="/profile/edit/id" element={<ProfileEditIdPage />} />
                <Route path="/profile/edit/pw" element={<ProfileEditPwPage />} />

                <Route path="/members/me/login-id" element={<IdEditPage />} />
                <Route path="/members/me/password" element={<PasswordEditPage />} />

                <Route path="/my-page/menu" element={<MyPageMenuPage />} />
                <Route path="/questions/me" element={<ReadingQuestionPage />} />
                <Route path="/reviews/me" element={<ReviewCommentPage />} />
                <Route path="/reviews/me/detail" element={<ReviewDetailPage />} />
                <Route path="/memos/me" element={<MyReadingMemoPage />} />
                <Route path="/members/me/records" element={<ReadingRecordPage />} />

            </Route>
        </>
    )
);
