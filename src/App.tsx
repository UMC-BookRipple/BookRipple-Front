import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import BookshelfPage from './pages/bookshelf/BookshelfPage';
import BookshelfSelectPage from './pages/bookshelf/BookshelfSelectPage';
import SideBar from './components/SideBar';
import { useSidebarStore } from './stores/SidebarStore';

export default function App() {
  const { isOpen, close } = useSidebarStore();

  return (
    <>
      <SideBar isOpen={isOpen} onClose={close} />
      <Routes>
        <Route path="/" element={<Navigate to="/bookshelf" replace />} />

        <Route path="/bookshelf" element={<BookshelfPage />} />
        <Route path="/bookshelf/:tab" element={<BookshelfPage />} />

        {/* tab을 URL path로 고정해서 매끄럽게 관리 */}
        <Route
          path="/bookshelf/:tab/select/:bookId"
          element={<BookshelfSelectPage />}
        />

        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>
    </>
  );
}
