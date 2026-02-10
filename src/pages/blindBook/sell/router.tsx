import { Routes, Route, Navigate } from 'react-router-dom';

import SellListPage from './pages/SellListPage';
import SellRegisterPage from './pages/SellRegisterPage';
import SellDetailPage from './pages/SellDetailPage';
import SellRequestsPage from './pages/SellRequestsPage';
import SellWaitingPage from './pages/SellWaitingPage';
import SellShippingPage from './pages/SellShippingPage';

export default function BlindBookSellRouter() {
  return (
    <Routes>
      <Route index element={<SellListPage />} />
      <Route path="new" element={<SellRegisterPage />} />

      <Route path=":postId" element={<SellDetailPage />} />
      <Route path=":postId/edit" element={<SellRegisterPage />} />
      <Route path=":postId/requests" element={<SellRequestsPage />} />
      <Route path=":postId/waiting" element={<SellWaitingPage />} />
      <Route path=":postId/shipping" element={<SellShippingPage />} />

      {/* 검색 페이지는 팀원 구현 예정: 이동만 가능하게 placeholder */}
      <Route
        path="search"
        element={<div className="p-6">검색 페이지(팀원 담당)</div>}
      />

      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
