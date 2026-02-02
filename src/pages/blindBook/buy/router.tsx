import { Routes, Route } from 'react-router-dom';

export default function BlindBookBuyRouter() {
  return (
    <Routes>
      <Route
        index
        element={<div className="p-6">구매 페이지(추후 구현)</div>}
      />
    </Routes>
  );
}
