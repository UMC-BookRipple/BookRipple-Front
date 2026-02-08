import { Routes, Route } from 'react-router-dom';
import './App.css';
import MyPageFindPage from './pages/FindPage';
import IdEditPage from './pages/IdEditPage';
import PasswordEditPage from './pages/PasswordEditPage';
import SignupPage from './pages/SignupPage';
import EditMenuPage from './pages/EditMenuPage';
import LoginPage from './pages/LoginPage';
import MyPageMenuPage from './pages/MyPageMenuPage';
import StartPage from './pages/StartPage';
import KakaoRedirect from './layouts/kakaoRedirect';
import SignupPage2 from './pages/SignupPage2';
import SignupPage3 from './pages/SignupPage3';
import FindPasswordPage from './pages/FindPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignupCompletePage from './pages/SignupCompletePage';
import PolicyPage from './pages/PolicyPage';
import ProfileEditIdPage from './pages/ProfileEditIdPage';
import ProfileEditPwPage from './pages/ProfileEditPwPage';
import FindIdPage from './pages/FIndIdPage';
import ReadingQuestionPage from './pages/ReadingQuestionPage';
import ReviewCommentPage from './pages/ReviewCommentPage';
import ReadingRecordPage from './pages/ReadingRecordPage';
import ReadingMemoPage from './pages/MyReadingMemoPage';

function App() {
  return (
    // router.tsx
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/oauth/kakao" element={<KakaoRedirect />} />
      <Route path='/auth/login/local' element={<LoginPage />} />
      <Route path='/signup/step1' element={<SignupPage />} />
      <Route path='/signup/step2' element={<SignupPage2 />} />
      <Route path='/signup/step3' element={<SignupPage3 />} />
      <Route path='/signup/complete' element={<SignupCompletePage />} />
      <Route path='/find/menu' element={<MyPageFindPage />} />
      <Route path='/find-id/email/send' element={<FindIdPage />} />
      <Route path='/find-password/email/send' element={<FindPasswordPage />} />
      <Route path='/find-password/reset' element={<ResetPasswordPage />} />
      <Route path='/policy' element={<PolicyPage />} />

      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/profile/edit/menu" element={<EditMenuPage />} />
      <Route path="/profile/edit/id" element={<ProfileEditIdPage />} />
      <Route path="/profile/edit/pw" element={<ProfileEditPwPage />} />
      <Route path="/members/me/login-id" element={<IdEditPage />} />
      <Route path="/members/me/password" element={<PasswordEditPage />} />
      <Route path="/my-page/menu" element={<MyPageMenuPage />} />
      <Route path="/" element={<FindIdPage />} />

      <Route path='/questions/me' element={<ReadingQuestionPage />} />
      <Route path='/reviews/me' element={<ReviewCommentPage />} />
      <Route path='/memos/me' element={<ReadingMemoPage />} />
      <Route path='/members/me/records' element={<ReadingRecordPage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
