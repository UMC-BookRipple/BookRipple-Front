import { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import MemoCard from '../components/MemoCard';
import PageHeader from '../components/PageHeader';
import useMemoStore from '../stores/useMemoStore';

export default function ReadingMemoListPage() {
  const navigate = useNavigate();
  const { memos, removeMemo, removeMemos, updateMemo } = useMemoStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelectAll = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedIds([]);
      return;
    }
    setIsSelectionMode(true);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }
    removeMemos(selectedIds);
    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  const emptyState = useMemo(() => memos.length === 0, [memos.length]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#4C4540]">
      <div className="sticky top-0 w-full bg-[#F7F5F1]">
        <Header />
        <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
          <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
            MEMO
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
          <PageHeader
            depth1="브람스를 좋아하세요..."
            depth2="독서메모"
            actionLabel={isSelectionMode ? '취소' : '선택'}
            onAction={toggleSelectAll}
          />
        </div>
      </div>

      <main className="flex w-full flex-col items-center gap-[10px] px-[16px] py-[10px]">
        <div className="flex w-full items-center justify-end text-[14px] text-[#58534E]">
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="text-[14px] font-medium text-[#58534E] underline underline-offset-4"
            >
              선택 삭제
            </button>
          )}
        </div>

        {emptyState ? (
          <div className="flex flex-col items-center gap-[25px] self-stretch rounded-[10px] bg-[#FFFFFF] p-[16px]">
            아직 작성된 메모가 없어요.
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {memos.map((memo, index) => (
              <Fragment key={memo.id}>
                <MemoCard
                  id={memo.id}
                  title="브람스를 좋아하세요?"
                  content={memo.content}
                  isSelected={selectedIds.includes(memo.id)}
                  isSelectionMode={isSelectionMode}
                  onToggleSelect={handleToggleSelect}
                  onDelete={removeMemo}
                  onUpdate={updateMemo}
                />

                {index < memos.length - 1 && (
                  <div className="my-4 h-[1px] w-full bg-[#58534E]" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </main>

      <div className="fixed bottom-0 z-50 flex h-[85px] w-full flex-col items-center justify-center gap-[10px] bg-[#F7F5F1] px-[20px] pt-[12px] pb-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
        <Button onClick={() => navigate('/reading/memo/write')}>
          작성하기
        </Button>
      </div>
    </div>
  );
}
