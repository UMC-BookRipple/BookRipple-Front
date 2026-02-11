import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button.tsx';
import Header from '../../../components/Header.tsx';
import PageHeader from '../../../components/PageHeader.tsx';
import QnACard from '../../../components/QnAcard.tsx';
import Toast from '../../../components/Toast.tsx';
import Modal from '../../../components/Modal.tsx';
import EditUnderBar from '../../../components/EditUnderBar.tsx';
import { useModalStore } from '../../../stores/ModalStore.ts';
import { useSwipeNavigate } from '../../../hooks/useSwipeNavigate.ts';
import { useBookTitle } from '../../../hooks/useBookTitle.ts';
import { useReadingProgress } from '../../../hooks/useReadingProgress.ts';
import { useCursorPagination } from '../../../hooks/useCursorPagination.ts';
import { useSelection } from '../../../hooks/useSelection.ts';
import { useQuestionDeleteActions } from '../../../hooks/useQuestionDeleteActions.ts';
import type { ReadingAiQnAItem } from '../../../api/questionApi.ts';

import {
  batchDeleteMyQuestions,
  deleteQuestion,
  deleteReadingQuestion,
  getBookQuestions,
  getReadingQuestions,
  patchReadingAnswer,
  type BookQuestionItem,
} from '../../../api/questionApi.ts';

type UiItem =
  | {
    key: string;
    kind: 'my';
    id: number;
    question: string;
    time: string; // createdAt
  }
  | {
    key: string;
    kind: 'ai';
    id: number;
    question: string;
    answer: string;
    time: string; // updatedAt
  };

const PAGE_SIZE = 20;

type LocationState = {
  toastMessage?: string;
};

export default function ReadingQuestionListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = useParams<{ bookId: string }>();
  const numericBookId = Number(bookId);

  // book title
  const bookTitle = useBookTitle(numericBookId) || '책 제목';

  // progress
  const readingProgress = useReadingProgress(numericBookId);
  const canAsk = readingProgress >= 50;

  // modal
  const { open: openModal } = useModalStore();

  // ai answer edit
  const [editingAiId, setEditingAiId] = useState<number | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  // toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('질문이 등록되었습니다');
  const toastTimeoutRef = useRef<number | null>(null);

  // swipe: right → timer
  const goToTimer = () => {
    if (!bookId) return;
    navigate(`/books/${bookId}/reading/timer`);
  };

  const { onPointerDown, onPointerUp } = useSwipeNavigate({
    onSwipeRight: goToTimer, // 타이머로 복귀
    thresholdPx: 80,
    maxVerticalPx: 60,
  });

  // pagination: my
  const myPager = useCursorPagination<UiItem>(
    async ({ lastId, size }) => {
      if (!Number.isFinite(numericBookId)) {
        return { items: [], lastId: null, hasNext: false };
      }

      const res = await getBookQuestions({
        bookId: numericBookId,
        onlyMine: true,
        lastId,
        size,
      });

      if (!res?.isSuccess) {
        throw new Error(res?.message || '내 질문 목록 조회 실패');
      }

      const rawList = res.result?.questionList;
      if (!Array.isArray(rawList)) {
        return { items: [], lastId: null, hasNext: false };
      }

      const list: UiItem[] = (rawList as BookQuestionItem[]).map((q) => ({
        key: `my-${q.id}`,
        kind: 'my',
        id: q.id,
        question: q.content,
        time: q.createdAt ?? new Date(0).toISOString(),
      }));

      return {
        items: list,
        lastId:
          typeof res.result.lastId === 'number' ? res.result.lastId : null,
        hasNext: Boolean(res.result.hasNext),
      };
    },
    {
      size: PAGE_SIZE,
      enabled: Boolean(bookId) && Number.isFinite(numericBookId),
    },
  );

  // pagination: ai
  const aiPager = useCursorPagination<UiItem>(
    async ({ lastId, size }) => {
      if (!Number.isFinite(numericBookId)) {
        return { items: [], lastId: null, hasNext: false };
      }

      const res = await getReadingQuestions({
        bookId: numericBookId,
        lastId,
        size,
      });

      if (!res?.isSuccess) {
        throw new Error(res?.message || 'AI 질문 목록 조회 실패');
      }

      const result = res.result;
      const rawList: ReadingAiQnAItem[] = Array.isArray(
        (result as any)?.readingAiQnAS,
      )
        ? (result as any).readingAiQnAS
        : [];

      const answeredOnly = rawList.filter(
        (x) => typeof x.answer === 'string' && x.answer.trim().length > 0,
      );

      const list: UiItem[] = answeredOnly.map((x: ReadingAiQnAItem) => ({
        key: `ai-${x.id}`,
        kind: 'ai',
        id: x.id,
        question: x.question,
        answer: x.answer ?? '',
        time: x.updatedAt ?? new Date(0).toISOString(),
      }));

      return {
        items: list,
        lastId: typeof result?.lastId === 'number' ? result.lastId : null,
        hasNext: Boolean(result?.hasNext),
      };
    },
    {
      size: PAGE_SIZE,
      enabled: Boolean(bookId) && Number.isFinite(numericBookId),
    },
  );

  // merge + sort
  const mergedItems = useMemo(() => {
    const merged = [...myPager.items, ...aiPager.items];
    return merged.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
  }, [myPager.items, aiPager.items]);

  // selection (string key)
  const sel = useSelection(mergedItems, (x) => x.key);

  const handleToggleSelectionMode = () => {
    // selection 진입 시 편집 상태 정리
    if (!sel.isSelectionMode) {
      setEditingAiId(null);
      setAnswerDraft('');
    }
    sel.toggleSelectionMode();
  };

  // delete actions (hook)
  const { requestDeleteSelected, requestDeleteMyOne, requestDeleteAiOne } =
    useQuestionDeleteActions({
      selectedKeys: sel.selectedIds,
      openModal,
      batchDeleteMyQuestions,
      deleteQuestion,
      deleteReadingQuestion,
      reloadMy: myPager.loadFirst,
      reloadAi: aiPager.loadFirst,
      clearSelection: sel.clear,
      exitSelectionMode: sel.exitSelectionMode,
      removeKeyFromSelection: sel.removeFromSelection,
    });

  // toast from route state
  useEffect(() => {
    const st = (location.state as LocationState | null) ?? null;
    if (!st?.toastMessage) return;

    setToastMessage(st.toastMessage);
    setToastVisible(true);

    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2000);

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // edit answer
  const startEditAnswer = (readingQuestionId: number) => {
    const current = aiPager.items.find(
      (it) => it.kind === 'ai' && it.id === readingQuestionId,
    );
    setEditingAiId(readingQuestionId);
    setAnswerDraft(current && current.kind === 'ai' ? current.answer : '');
  };

  const cancelEditAnswer = () => {
    setEditingAiId(null);
    setAnswerDraft('');
  };

  const saveEditAnswer = async () => {
    if (!editingAiId) return;
    const trimmed = answerDraft.trim();
    if (!trimmed) return;

    try {
      const res = await patchReadingAnswer({
        readingQuestionId: editingAiId,
        body: { content: trimmed },
      });

      if (!res?.isSuccess) throw new Error(res?.message || '답변 저장 실패');

      await aiPager.loadFirst();
      setEditingAiId(null);
      setAnswerDraft('');
    } catch (e) {
      console.error(e);
    }
  };

  // pagination action (버튼)
  const handleLoadMore = async () => {
    const tasks: Promise<void>[] = [];
    if (myPager.hasNext) tasks.push(myPager.loadMore());
    if (aiPager.hasNext) tasks.push(aiPager.loadMore());
    await Promise.all(tasks);
  };

  const anyLoading = myPager.loading || aiPager.loading;
  const canLoadMore = myPager.hasNext || aiPager.hasNext;

  // UI: canAsk false
  if (!canAsk) {
    return (
      <div
        className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px]"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <Modal />

        <div className="sticky top-0 z-50 w-full bg-[#F7F5F1]">
          <Header />
          <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
            <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
              Q&A
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
            <PageHeader depth1={bookTitle} depth2="독서 질문" />
          </div>
        </div>

        <main className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[20px] py-[10px]">
          <div className="flex h-[342px] flex-col items-center justify-center gap-[90px] self-stretch rounded-[20px] bg-white px-[10px] py-[120px]">
            <p className="text-center font-sans text-[18px] leading-normal font-medium text-[#58534E]">
              질문은 50% 이상 읽어야 가능
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px]"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Modal />

      <div className="sticky top-0 z-50 w-full bg-[#F7F5F1]">
        <Header />
        <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
          <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
            Q&A
          </p>
        </div>

        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
          <PageHeader
            depth1={bookTitle}
            depth2="독서 질문"
            actionLabel={sel.isSelectionMode ? '취소' : '선택'}
            onAction={handleToggleSelectionMode}
          />
        </div>
      </div>

      <main className="flex w-full flex-col items-center gap-[10px] px-[16px] py-[10px] pb-[120px]">
        {mergedItems.length === 0 ? (
          <div className="flex flex-col items-center gap-[25px] self-stretch rounded-[10px] bg-white p-[16px] text-[16px] text-[#58534E]">
            아직 작성된 질문이 없어요.
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {mergedItems.map((item, index) => {
              const isSelected = sel.isSelected(item.key);

              const cardClassName = isSelected
                ? 'border border-[#58534E]'
                : 'border border-transparent';

              return (
                <Fragment key={item.key}>
                  {item.kind === 'my' ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        sel.isSelectionMode
                          ? sel.toggleOne(item.key)
                          : navigate(`/questions/${item.id}/answers`, {
                            state: {
                              questionContent: item.question,
                              bookTitle,
                            },
                          })
                      }
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter' && e.key !== ' ') return;
                        e.preventDefault();
                        sel.isSelectionMode
                          ? sel.toggleOne(item.key)
                          : navigate(`/questions/${item.id}/answers`, {
                            state: {
                              questionContent: item.question,
                              bookTitle,
                            },
                          });
                      }}
                      className="w-full"
                    >
                      <QnACard
                        variant="my-question"
                        content={item.question}
                        className={cardClassName}
                        onDelete={
                          sel.isSelectionMode
                            ? undefined
                            : () => requestDeleteMyOne(item.id)
                        }
                      />
                    </div>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (sel.isSelectionMode) sel.toggleOne(item.key);
                      }}
                      onKeyDown={(e) => {
                        if (!sel.isSelectionMode) return;
                        if (e.key !== 'Enter' && e.key !== ' ') return;
                        e.preventDefault();
                        sel.toggleOne(item.key);
                      }}
                      className="w-full"
                    >
                      <div className="flex w-full flex-col gap-[10px]">
                        <QnACard
                          variant="reading-ai-question"
                          content={item.question}
                          className={cardClassName}
                          onDelete={
                            sel.isSelectionMode
                              ? undefined
                              : () => requestDeleteAiOne(item.id)
                          }
                        />

                        {item.answer && (
                          <QnACard
                            variant="answer"
                            content={item.answer ?? ''} // ← 빈 값 허용
                            onEdit={() => startEditAnswer(item.id)}
                            isEditing={editingAiId === item.id}
                            draft={editingAiId === item.id ? answerDraft : ''}
                            onChangeDraft={setAnswerDraft}
                            onCancel={cancelEditAnswer}
                            onSave={saveEditAnswer}
                            showEditIcon={!sel.isSelectionMode}
                            showDeleteIcon={false}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {index < mergedItems.length - 1 && (
                    <div className="my-4 h-[1px] w-full bg-[#58534E]" />
                  )}
                </Fragment>
              );
            })}

            {/* 페이지네이션 UI(최소 추가) */}
            {canLoadMore && (
              <div className="flex w-full justify-center py-4">
                <button
                  type="button"
                  onClick={() => void handleLoadMore()}
                  disabled={anyLoading}
                  className="text-[14px] font-medium text-[#58534E] underline underline-offset-4 disabled:opacity-50"
                >
                  {anyLoading ? '불러오는 중...' : '더 불러오기'}
                </button>
              </div>
            )}

            {(myPager.error || aiPager.error) && (
              <div className="flex w-full justify-center py-2 text-[14px] text-red-500">
                {myPager.error || aiPager.error}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 하단 UI */}
      {sel.isSelectionMode ? (
        <EditUnderBar
          onSelectAll={sel.selectAll}
          onDelete={requestDeleteSelected}
          deleteDisabled={sel.selectedIds.length === 0}
        />
      ) : (
        <div className="fixed bottom-0 z-50 flex h-[85px] w-full flex-col items-center justify-center gap-[10px] bg-[#F7F5F1] px-[20px] pt-[12px] pb-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
          <Button
            onClick={() =>
              navigate(`/books/${bookId}/questions/new`, {
                state: { bookTitle },
              })
            }
          >
            사람들에게 질문하기
          </Button>
        </div>
      )}

      {/* 토스트 */}
      <div
        className={`pointer-events-none fixed left-1/2 z-20 -translate-x-1/2 transition-all duration-300 ease-in-out ${toastVisible
            ? 'bottom-[100px] translate-y-0 opacity-100'
            : 'bottom-[100px] translate-y-[10px] opacity-0'
          }`}
      >
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </div>
  );
}
