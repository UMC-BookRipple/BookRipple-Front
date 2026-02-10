import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '/src/assets/icons/logo.svg';

import Header from '../../../components/Header';
import Modal from '../../../components/Modal';
import { useModalStore } from '../../../stores/ModalStore';
import { useBookshelfStore } from '../../../stores/BookshelfStore';

import type { BookshelfTabKey } from '../../../types/bookshelf.type';
import { tabToStatus } from '../../../types/bookshelf.type';
import { filterByTab, isBookshelfTabKey } from '../../../utils/bookshelf.utils';

import BookshelfTabs from '../../../components/Bookshelf/BookshelfTabs';
import BookshelfToolbar from '../../../components/Bookshelf/BookshelfToolbar';
import BookGrid from '../../../components/Bookshelf/BookGrid';
import EditBottomBar from '../../../components/Bookshelf/EditBottomBar';
import BookshelfFooter from '../../../components/Bookshelf/BookshelfFooter';
import { toggleBookLike } from '../../../api/bookshelf.api';

export default function BookshelfPage() {
  const navigate = useNavigate();
  const params = useParams();
  const modalStore = useModalStore();
  const { books, isLoading, error, fetchBooksByTab, deleteBooks } =
    useBookshelfStore();

  const tabParam = params.tab ?? 'reading';
  const initialTab: BookshelfTabKey = isBookshelfTabKey(tabParam)
    ? tabParam
    : 'reading';

  const [activeTab, setActiveTab] = useState<BookshelfTabKey>(initialTab);
  const [isEditMode, setIsEditMode] = useState(false);

  // 편집 모드 선택 상태
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 컴포넌트 마운트 시 데이터 fetch
  useEffect(() => {
    fetchBooksByTab(activeTab);
  }, []);

  // URL 파라미터가 변경되면 activeTab 업데이트 및 데이터 fetch
  useEffect(() => {
    if (params.tab && isBookshelfTabKey(params.tab)) {
      setActiveTab(params.tab);
      fetchBooksByTab(params.tab);
    }
  }, [params.tab, fetchBooksByTab]);

  const visibleBooks = useMemo(
    () => filterByTab(books, activeTab),
    [books, activeTab],
  );

  const handleChangeTab = (tab: BookshelfTabKey) => {
    navigate(`/bookshelf/${tab}`);
    setIsEditMode(false);
    setSelectedIds(new Set());
  };

  const handleToggleEdit = () => {
    setIsEditMode((prev) => !prev);
    setSelectedIds(new Set());
  };

  const toggleSelect = (bookId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  };

  const handleClickBook = (bookId: string) => {
    if (isEditMode) {
      toggleSelect(bookId);
      return;
    }

    const book = books.find((b) => b.id === bookId);
    if (!book || !book.bookId) {
      console.error('❌ Book not found or missing bookId:', bookId);
      return;
    }

    // 도서 선택 상세로 이동 - API bookId 사용
    console.log('📖 Navigating to book detail:', {
      bookId: book.bookId,
      tab: activeTab,
    });
    navigate(`/bookshelf/${activeTab}/select/${book.bookId}`);
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(visibleBooks.map((b) => b.id)));
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBooks(Array.from(selectedIds), tabToStatus[activeTab]);
      setSelectedIds(new Set());
      setIsEditMode(false);
      modalStore.close();
    } catch (error) {
      console.error('❌ Failed to delete books:', error);
      alert('도서 삭제에 실패했습니다.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedIds.size === 0) return;

    // ModalStore로 confirmAction까지 등록
    modalStore.open('삭제하시겠습니까?', handleConfirmDelete);
  };

  const handleToggleLike = async (bookId: string) => {
    const book = books.find((b) => b.id === bookId);

    if (!book || !book.bookId) {
      console.error('❌ Book not found or missing bookId:', bookId);
      return;
    }

    try {
      await toggleBookLike(book.bookId, book.isLiked);
      // Refresh data to get updated state
      await fetchBooksByTab(activeTab);
    } catch (error) {
      console.error('❌ Failed to toggle like:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F1]">
      <Header />
      <div className="mx-auto flex w-full max-w-[402px] flex-1 flex-col bg-[#F7F5F1]">
        {/* 로고 영역 */}
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[28px]">
          <img src={logo} alt="BookRipple" className="h-[95.6px] w-[382px]" />
        </section>

        <BookshelfTabs
          activeTab={activeTab}
          onChangeTab={handleChangeTab}
          onSearchClick={() => {
            navigate('/bookshelf/search');
          }}
        />

        <BookshelfToolbar
          isEditMode={isEditMode}
          onToggleEdit={handleToggleEdit}
        />

        <div className="w-full flex-1">
          {error ? (
            <div className="flex flex-col items-center justify-center px-4 py-20">
              <div className="mb-2 font-semibold text-red-600">오류 발생</div>
              <div className="text-center text-sm text-[#58534E]/70">
                {error}
              </div>
              <div className="mt-4 text-xs text-[#58534E]/50">
                콘솔(F12)에서 자세한 로그를 확인하세요
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-[#58534E]/70">로딩 중...</div>
            </div>
          ) : (
            <BookGrid
              books={visibleBooks}
              isEditMode={isEditMode}
              selectedIds={selectedIds}
              onClickBook={handleClickBook}
              onToggleLike={handleToggleLike}
            />
          )}
        </div>

        <BookshelfFooter />
      </div>
      {/* 편집 모드 하단바 */}
      {isEditMode && (
        <EditBottomBar
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteClick}
        />
      )}
      {/* Modal: store 기반으로 렌더링 */}
      <Modal />
    </div>
  );
}
