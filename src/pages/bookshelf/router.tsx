import { Routes, Route, Navigate } from 'react-router-dom';
import BookshelfPage from './BookshelfPage';
import BookshelfSelectPage from './BookshelfSelectPage';

export default function BookshelfRouter() {
  return (
    <Routes>
      {/* 기본 책장 페이지 */}
      <Route path="/" element={<BookshelfPage />} />

      {/* 탭별 책장 페이지 */}
      <Route path="/:tab" element={<BookshelfPage />} />

      {/* 책 상세 페이지 */}
      <Route path="/:tab/select/:bookId" element={<BookshelfSelectPage />} />

      {/* 404 처리 */}
      <Route path="*" element={<Navigate to="/bookshelf" replace />} />
    </Routes>
  );
}
