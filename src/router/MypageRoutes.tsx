import { Route } from 'react-router-dom';

import { ProtectedRoute } from '../components/ProtectedRoute';
import EditMenuPage from '../pages/MyPage/EditMenuPage';
import ProfileEditIdPage from '../pages/MyPage/ProfileEditIdPage';
import ProfileEditPwPage from '../pages/MyPage/ProfileEditPwPage';
import IdEditPage from '../pages/MyPage/IdEditPage';
import PasswordEditPage from '../pages/MyPage/PasswordEditPage';
import MyPageMenuPage from '../pages/MyPage/MyPageMenuPage';
import ReadingQuestionPage from '../pages/MyPage/ReadingQuestionPage';
import ReviewCommentPage from '../pages/MyPage/ReviewCommentPage';
import ReviewDetailPage from '../pages/MyPage/ReviewDetailPage';
import ReadingRecordPage from '../pages/MyPage/ReadingRecordPage';
import MyReadingMemoPage from '../pages/MyPage/MyReadingMemoPage';

export default function MypageRoutes() {
  return (
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
    </Route>
  );
}
