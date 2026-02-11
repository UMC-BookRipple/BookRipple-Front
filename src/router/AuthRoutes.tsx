import { Route } from 'react-router-dom';

import StartPage from '../pages/Login/StartPage';
import KakaoRedirect from '../layouts/kakaoRedirect';
import LoginPage from '../pages/Login/LoginPage';
import SignupPage from '../pages/Login/SignupPage';
import SignupPage2 from '../pages/Login/SignupPage2';
import SignupPage3 from '../pages/Login/SignupPage3';
import SignupCompletePage from '../pages/Login/SignupCompletePage';
import FindPage from '../pages/Login/FindPage';
import FindIdPage from '../pages/Login/FIndIdPage';
import FindPasswordPage from '../pages/Login/FindPasswordPage';
import ResetPasswordPage from '../pages/MyPage/ResetPasswordPage';
import PolicyPage from '../pages/Login/PolicyPage';

export default function AuthRoutes() {
  return (
    <>
      <Route path="/start" element={<StartPage />} />
      <Route path="/oauth/kakao" element={<KakaoRedirect />} />
      <Route path="/auth/login/local" element={<LoginPage />} />
      <Route path="/signup/step1" element={<SignupPage />} />
      <Route path="/signup/step2" element={<SignupPage2 />} />
      <Route path="/signup/step3" element={<SignupPage3 />} />
      <Route path="/signup/complete" element={<SignupCompletePage />} />
      <Route path="/find/menu" element={<FindPage />} />
      <Route path="/find-id/email/send" element={<FindIdPage />} />
      <Route path="/find-password/email/send" element={<FindPasswordPage />} />
      <Route path="/find-password/reset" element={<ResetPasswordPage />} />
      <Route path="/policy" element={<PolicyPage />} />
    </>
  );
}
