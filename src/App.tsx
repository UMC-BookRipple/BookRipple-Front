import { Routes, Route, Navigate } from 'react-router-dom';
import BlindBookRouter from './pages/blindBook/router';
import BookshelfRouter from './pages/bookshelf/router';

function App() {
  return (
    <Routes>
      {/* Root redirects to bookshelf for testing */}
      <Route path="/" element={<Navigate to="/bookshelf" replace />} />

      {/* 책장 라우트 */}
      <Route path="/bookshelf/*" element={<BookshelfRouter />} />

      {/* 블라인드북 도메인 라우트 */}
      <Route path="/blind-book/*" element={<BlindBookRouter />} />

      {/* 404 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
