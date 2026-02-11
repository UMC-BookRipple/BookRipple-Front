import { Fragment, useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import MemoCard from '../../components/Card/MemoCard';
import EditUnderBar from '../../components/EditUnderBar';
import Modal from '../../components/Modal';
import BookTitleLabel from '../../components/BookTitleLabel';
import { useModalStore } from '../../stores/ModalStore';
import { useSelection } from '../../hooks/useSelection';
import {
  deleteMemo as apiDeleteMemo,
  fetchMyMemoList,
  updateMemo as apiUpdateMemo,
  type MemoUpsertReq,
} from '../../api/memoApi';

type MyMemoItem = {
  memoId: number;
  writerName: string;
  bookId: number;
  bookTitle: string;
  memoTitle: string;
  context: string;
  page: string;
};

function toUpsertReq(payload: {
  memoTitle: string;
  context: string;
  page: string;
}): MemoUpsertReq {
  return {
    contentReq: { content: payload.context },
    memoTitle: payload.memoTitle,
    page: payload.page,
  };
}

export default function MyReadingMemoPage() {
  const [memos, setMemos] = useState<MyMemoItem[]>([]);
  const [expandedBookIds, setExpandedBookIds] = useState<Set<number>>(
    new Set(),
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { open } = useModalStore();

  useEffect(() => {
    void loadFirst();
  }, []);

  const loadFirst = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchMyMemoList(undefined, 50);
      if (!res.isSuccess)
        throw new Error(res.message || '내 메모 목록 조회 실패');

      const items = (res.result.items ?? []) as unknown as MyMemoItem[];
      setMemos(items);

      // 최초에는 "책 제목만 쭉 나열"이 아니라, 클릭하면 아래로 펼쳐지는 형태이므로
      // 자동 펼침을 원하면 아래 2줄을 활성화하세요.
      // const firstBookId = items[0]?.bookId;
      // if (firstBookId) setExpandedBookIds(new Set([firstBookId]));
    } catch (e: any) {
      setError(e?.message ?? '내 메모 목록 조회 실패');
    } finally {
      setIsLoading(false);
    }
  };

  // 책 목록(중복 제거) + 표시 순서 보장(처음 등장 순)
  const books = useMemo(() => {
    const map = new Map<number, string>();
    for (const m of memos) {
      if (!map.has(m.bookId)) map.set(m.bookId, m.bookTitle);
    }
    return Array.from(map.entries()).map(([bookId, bookTitle]) => ({
      bookId,
      bookTitle,
    }));
  }, [memos]);

  const memosByBookId = useMemo(() => {
    const map = new Map<number, MyMemoItem[]>();
    for (const m of memos) {
      const arr = map.get(m.bookId);
      if (arr) arr.push(m);
      else map.set(m.bookId, [m]);
    }
    return map;
  }, [memos]);

  // selection은 "현재 펼쳐져서 화면에 보이는 메모" 기준으로만 동작
  const visibleMemos = useMemo(() => {
    if (expandedBookIds.size === 0) return [];
    return memos.filter((m) => expandedBookIds.has(m.bookId));
  }, [memos, expandedBookIds]);

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
  } = useSelection(visibleMemos, (m) => m.memoId);

  const emptyState = useMemo(
    () => !isLoading && memos.length === 0,
    [isLoading, memos.length],
  );

  const removeMemo = async (memoId: number) => {
    setError(null);
    try {
      const res = await apiDeleteMemo(memoId);
      if (!res.isSuccess) throw new Error(res.message || '메모 삭제 실패');

      setMemos((prev) => prev.filter((m) => m.memoId !== memoId));
      removeFromSelection(memoId);
    } catch (e: any) {
      setError(e?.message ?? '메모 삭제 실패');
      throw e;
    }
  };

  const removeMemos = async (memoIds: number[]) => {
    if (memoIds.length === 0) return;
    setError(null);
    await Promise.all(memoIds.map((id) => removeMemo(id)));
  };

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
    });
  };

  const editMemo = async (
    memoId: number,
    payload: { memoTitle: string; context: string; page: string },
  ) => {
    const nextTitle = payload.memoTitle.trim();
    const nextContext = payload.context.trim();
    const nextPage = payload.page.trim();
    if (!nextTitle || !nextContext || !nextPage) return;

    setError(null);
    try {
      const res = await apiUpdateMemo(memoId, toUpsertReq(payload));
      if (!res.isSuccess) throw new Error(res.message || '메모 수정 실패');

      setMemos((prev) =>
        prev.map((m) =>
          m.memoId === memoId
            ? {
                ...m,
                memoTitle: nextTitle,
                context: nextContext,
                page: nextPage,
              }
            : m,
        ),
      );
    } catch (e: any) {
      setError(e?.message ?? '메모 수정 실패');
      throw e;
    }
  };

  const toggleBook = (bookId: number) => {
    setExpandedBookIds((prev) => {
      const next = new Set(prev);

      // 접기
      if (next.has(bookId)) {
        next.delete(bookId);

        // 접는 책의 메모는 selection에서 제외(선택모드 UX 안정)
        const list = memosByBookId.get(bookId) ?? [];
        for (const m of list) removeFromSelection(m.memoId);

        return next;
      }

      // 펼치기
      next.add(bookId);
      return next;
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#4C4540]">
      <Modal />

      <div className="sticky top-0 w-full bg-[#F7F5F1]">
        <Header />
        <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
          <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
            MYPAGE
          </p>
        </div>

        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
          <PageHeader
            depth1="내 기록 확인"
            depth2="독서메모"
            actionLabel={isSelectionMode ? '취소' : '선택'}
            onAction={toggleSelectionMode}
          />
        </div>
      </div>

      <main
        className={`flex w-full flex-col items-stretch gap-[10px] px-[16px] py-[10px] ${
          isSelectionMode ? 'pb-[90px]' : ''
        }`}
      >
        {isLoading && <p>불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {emptyState ? (
          <div className="flex w-full flex-col items-center gap-[25px] self-stretch rounded-[10px] bg-[#FFFFFF] p-[16px]">
            아직 작성된 메모가 없어요.
          </div>
        ) : (
          <div className="w-full">
            {books.map((b) => {
              const expanded = expandedBookIds.has(b.bookId);
              const list = memosByBookId.get(b.bookId) ?? [];

              return (
                <section key={b.bookId} className="w-full">
                  {/* BookTitleLabel 클릭 영역 */}
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => toggleBook(b.bookId)}
                  >
                    <BookTitleLabel BookTitle={b.bookTitle} />
                  </button>

                  {/* 펼쳐진 경우: 해당 책 메모를 "그 아래"에 렌더 */}
                  {expanded && (
                    <div className="flex w-full flex-col gap-[16px] pb-[16px]">
                      {list.length === 0 ? (
                        <div className="rounded-[10px] bg-white p-[16px] text-[#58534E]">
                          이 책에 작성된 메모가 없어요.
                        </div>
                      ) : (
                        list.map((memo, index) => (
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
                            {index < list.length - 1 && (
                              <div className="h-[1px] w-full bg-[#58534E]" />
                            )}
                          </Fragment>
                        ))
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>

      {isSelectionMode && (
        <EditUnderBar
          onSelectAll={selectAll}
          onDelete={handleDeleteSelected}
          deleteDisabled={!hasSelection}
        />
      )}
    </div>
  );
}
