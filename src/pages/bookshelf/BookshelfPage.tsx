import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '/src/assets/icons/logo.svg';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { useModalStore } from '../../stores/ModalStore';
import { useBookshelfStore } from '../../stores/BookshelfStore';

import type { BookshelfTabKey } from './_types/bookshelf.type';
import { filterByTab, isBookshelfTabKey } from './_utils/bookshelf.utils';

import BookshelfTabs from './_components/BookshelfTabs';
import BookshelfToolbar from './_components/BookshelfToolbar';
import BookGrid from './_components/BookGrid';
import EditBottomBar from './_components/EditBottomBar';
import BookshelfFooter from './_components/BookshelfFooter';

export default function BookshelfPage() {
  const navigate = useNavigate();
  const params = useParams();
  const modalStore = useModalStore();
  const { books, toggleLike, deleteBooks } = useBookshelfStore();

  const tabParam = params.tab ?? 'reading';
  const initialTab: BookshelfTabKey = isBookshelfTabKey(tabParam)
    ? tabParam
    : 'reading';

  const [activeTab, setActiveTab] = useState<BookshelfTabKey>(initialTab);
  const [isEditMode, setIsEditMode] = useState(false);

  // 편집 모드 선택 상태
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // URL 파라미터가 변경되면 activeTab 업데이트
  useEffect(() => {
    if (params.tab && isBookshelfTabKey(params.tab)) {
      setActiveTab(params.tab);
    }
  }, [params.tab]);

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

    // 도서 선택 상세로 이동
    navigate(`/bookshelf/${activeTab}/select/${bookId}`);
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(visibleBooks.map((b) => b.id)));
  };

  const handleConfirmDelete = () => {
    // delete API 붙일 자리
    deleteBooks(Array.from(selectedIds));

    setSelectedIds(new Set());
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    if (selectedIds.size === 0) return;

    // ModalStore로 confirmAction까지 등록
    modalStore.open('삭제하시겠습니까?', handleConfirmDelete);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F1]">
      {/* 공통 Header */}
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
            // 검색으로 연결 필요
          }}
        />

        <BookshelfToolbar
          isEditMode={isEditMode}
          onToggleEdit={handleToggleEdit}
        />

        <div className="w-full flex-1">
          <BookGrid
            books={visibleBooks}
            isEditMode={isEditMode}
            selectedIds={selectedIds}
            onClickBook={handleClickBook}
            onToggleLike={toggleLike}
          />
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
