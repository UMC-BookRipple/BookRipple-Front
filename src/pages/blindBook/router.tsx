import { Routes, Route, Navigate } from 'react-router-dom';
import BlindBookSellRouter from './sell/router';
import BlindBookBuyRouter from './buy/router';


export default function BlindBookRouter() {
  return (
    <Routes>
      {/* /blind-book 진입 시 판매로 보냄(원하면 buy로 바꿔도 됨) */}
      <Route index element={<Navigate to="sell" replace />} />

      <Route path="sell/*" element={<BlindBookSellRouter />} />

      <Route path="buy/*" element={<BlindBookBuyRouter />} />

      <Route path="*" element={<Navigate to="sell" replace />} />
    </Routes>
  );
}
