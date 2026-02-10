// router/index.tsx (예시)
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import StartPage from "../pages/Login/StartPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/Login/LoginPage";
import SignupPage from "../pages/Login/SignupPage";
import SignupPage2 from "../pages/Login/SignupPage2";
import SignupPage3 from "../pages/Login/SignupPage3";
import SignupCompletePage from "../pages/Login/SignupCompletePage";

import IdEditPage from "../pages/MyPage/IdEditPage";
import PasswordEditPage from "../pages/MyPage/PasswordEditPage";
import ReadingQuestionPage from "../pages/MyPage/ReadingQuestionPage";
import MyReadingMemoPage from "../pages/MyPage/MyReadingMemoPage";
import EditMenuPage from "../pages/MyPage/EditMenuPage";
import MyPageFindPage from "../pages/Login/FindPage";

import KakaoRedirect from "../layouts/kakaoRedirect";
import FindIdPage from "../pages/Login/FIndIdPage";
import FindPasswordPage from "../pages/Login/FindPasswordPage";
import ResetPasswordPage from "../pages/MyPage/ResetPasswordPage";
import PolicyPage from "../pages/Login/PolicyPage";
import ProfileEditIdPage from "../pages/MyPage/ProfileEditIdPage";
import ProfileEditPwPage from "../pages/MyPage/ProfileEditPwPage";
import MyPageMenuPage from "../pages/MyPage/MyPageMenuPage";
import ReviewCommentPage from "../pages/MyPage/ReviewCommentPage";
import ReadingRecordPage from "../pages/MyPage/ReadingRecordPage";
import ReviewDetailPage from "../pages/MyPage/ReviewDetailPage";
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
