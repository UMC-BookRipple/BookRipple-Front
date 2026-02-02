import { Routes, Route, Navigate } from 'react-router-dom';
import BlindBookRouter from './pages/blindBook/router';

function App() {
  return (
    <Routes>
      {/* 기존 라우트들... */}

      {/* ✅ 블라인드북 도메인 라우트 */}
      <Route path="/blind-book/*" element={<BlindBookRouter />} />

      {/* 기존 404 처리 방식이 있으면 그걸 유지 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
