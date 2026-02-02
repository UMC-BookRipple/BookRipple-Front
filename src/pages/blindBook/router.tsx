import { Routes, Route, Navigate } from 'react-router-dom';
import BlindBookSellRouter from './sell/router';

// 구매는 나중에 만들 예정이라 자리만
// import BlindBookBuyRouter from './buy/router';

export default function BlindBookRouter() {
  return (
    <Routes>
      {/* /blind-book 진입 시 판매로 보냄(원하면 buy로 바꿔도 됨) */}
      <Route index element={<Navigate to="sell" replace />} />

      <Route path="sell/*" element={<BlindBookSellRouter />} />

      {/* 구매 탭은 나중에 구현 */}
      <Route
        path="buy/*"
        element={<div className="p-6">구매 페이지(추후 구현)</div>}
      />

      <Route path="*" element={<Navigate to="sell" replace />} />
    </Routes>
  );
}
