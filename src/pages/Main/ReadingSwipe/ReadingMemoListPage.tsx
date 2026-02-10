import { Fragment, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import MemoCard from '../../../components/Card/MemoCard';
import PageHeader from '../../../components/PageHeader';
import EditUnderBar from '../../../components/EditUnderBar';
import Modal from '../../../components/Modal';
import useMemoStore from '../../../stores/useMemoStore';
import { useModalStore } from '../../../stores/ModalStore';
import { useSwipeNavigate } from '../../../hooks/useSwipeNavigate';
import { useBookTitle } from '../../../hooks/useBookTitle';
import { useSelection } from '../../../hooks/useSelection';

export default function ReadingMemoListPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  const bookTitle = useBookTitle(numericBookId);

  const {
    memos,
    loadMemos,
    setCurrentBookId,
    isLoading,
    error,
    removeMemo,
    removeMemos,
    editMemo,
  } = useMemoStore();

  useEffect(() => {
    if (!numericBookId || Number.isNaN(numericBookId)) return;
    setCurrentBookId(numericBookId);
    loadMemos(numericBookId);
  }, [numericBookId, setCurrentBookId, loadMemos]);

  const {
    selectedIds,
    isSelectionMode,
    hasSelection,
    toggleSelectionMode,
    exitSelectionMode,
    toggleOne,
    selectAll,
    removeFromSelection,
    isSelected,
  } = useSelection(memos, (m) => m.memoId);

  // delete + modal
  const { open } = useModalStore();

  const doDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    await removeMemos(selectedIds);
    exitSelectionMode();
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    open('삭제하시겠습니까?', () => {
      void doDeleteSelected();
    });
  };

  const handleDeleteOne = (memoId: number) => {
    open('삭제하시겠습니까?', () => {
      void removeMemo(memoId);
      removeFromSelection(memoId);
    });
  };

  // swipe: left → timer
  const { onPointerDown, onPointerUp } = useSwipeNavigate({
    onSwipeLeft: () => {
      if (!numericBookId || Number.isNaN(numericBookId)) return;
      navigate(`/books/${numericBookId}/reading/timer`);
    },
    thresholdPx: 60,
    maxVerticalPx: 40,
  });

  const emptyState = useMemo(() => memos.length === 0, [memos.length]);

  return (
    <div
      className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#4C4540]"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Modal />

      <div className="sticky top-0 w-full bg-[#F7F5F1]">
        <Header />
        <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
          <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
            MEMO
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
          <PageHeader
            depth1={bookTitle || '책 제목'}
            depth2="독서 메모"
            actionLabel={isSelectionMode ? '취소' : '선택'}
            onAction={toggleSelectionMode}
          />
        </div>
      </div>

      <main
        className={`flex w-full flex-col items-center gap-[10px] px-[16px] py-[10px] ${
          isSelectionMode ? 'pb-[90px]' : ''
        }`}
      >
        {isLoading && <p>불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {emptyState && !isLoading ? (
          <div className="flex flex-col items-center gap-[25px] self-stretch rounded-[10px] bg-[#FFFFFF] p-[16px]">
            아직 작성된 메모가 없어요.
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {memos.map((memo, index) => (
              <Fragment key={memo.memoId}>
                <MemoCard
                  id={memo.memoId}
                  title={memo.memoTitle}
                  content={memo.context}
                  page={memo.page}
                  isSelected={isSelected(memo.memoId)}
                  isSelectionMode={isSelectionMode}
                  onToggleSelect={toggleOne}
                  onDelete={handleDeleteOne}
                  onUpdate={editMemo}
                />
                {index < memos.length - 1 && (
                  <div className="my-4 h-[1px] w-full bg-[#58534E]" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </main>

      {isSelectionMode ? (
        <EditUnderBar
          onSelectAll={selectAll}
          onDelete={handleDeleteSelected}
          deleteDisabled={!hasSelection}
        />
      ) : (
        <div className="fixed bottom-0 z-50 flex h-[85px] w-full flex-col items-center justify-center gap-[10px] bg-[#F7F5F1] px-[20px] pt-[12px] pb-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
          <Button onClick={() => navigate(`/books/${numericBookId}/memos/new`)}>
            작성하기
          </Button>
        </div>
      )}
    </div>
  );
}
