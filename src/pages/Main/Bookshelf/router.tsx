import { Routes, Route, Navigate } from 'react-router-dom';
import BookshelfPage from './BookshelfPage';
import BookshelfSelectPage from './BookshelfSelectPage';
import BookShelfMemoPage from './BookShelfMemoPage';

export default function BookshelfRouter() {
  return (
    <Routes>
      {/* 기본 책장 페이지 */}
      <Route path="/" element={<BookshelfPage />} />

      {/* 탭별 책장 페이지 */}
      <Route path="/:tab" element={<BookshelfPage />} />

      {/* 책 상세 페이지 */}
      <Route path="/:tab/select/:bookId" element={<BookshelfSelectPage />} />

      {/* 도서 메모 페이지 */}
      <Route
        path="/:tab/select/:bookId/memos"
        element={<BookShelfMemoPage />}
      />

      {/* 404 처리 */}
      <Route path="*" element={<Navigate to="/bookshelf" replace />} />
    </Routes>
  );
}
