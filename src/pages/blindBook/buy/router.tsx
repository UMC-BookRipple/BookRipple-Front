import { Routes, Route, Navigate } from 'react-router-dom';

import BuyListPage from './pages/BuyListPage.tsx';
import BuyDetailPage from './pages/BuyDetailPage.tsx';
import BuyPaymentPage from './pages/BuyPaymentPage.tsx';
import BuyWaitingPage from './pages/BuyWaitingPage.tsx';
import BuyTradeCanceledPage from './pages/BuyTradeCanceledPage.tsx';
import BuyApprovedPage from './pages/BuyApprovedPage.tsx';
import BuyShippingStartedPage from './pages/BuyShippingStartedPage.tsx';
import BuyCompletePage from './pages/BuyCompletePage.tsx';
import BuyRevealPage from './pages/BuyRevealPage.tsx';

export default function BlindBookBuyRouter() {
  return (
    <Routes>
      <Route index element={<BuyListPage />} />

      <Route path=":postId" element={<BuyDetailPage />} />
      <Route path=":postId/payment" element={<BuyPaymentPage />} />
      <Route path=":postId/waiting" element={<BuyWaitingPage />} />
      <Route path=":postId/canceled" element={<BuyTradeCanceledPage />} />
      <Route path=":postId/approved" element={<BuyApprovedPage />} />
      <Route path=":postId/shipping-started" element={<BuyShippingStartedPage />} />
      <Route path=":postId/complete" element={<BuyCompletePage />} />
      <Route path=":postId/reveal" element={<BuyRevealPage />} />

      {/* 검색 페이지는 팀원 구현 예정: 이동만 가능하게 placeholder */}
      <Route
        path="search"
        element={<div className="p-6">검색 페이지(팀원 담당)</div>}
      />

      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}