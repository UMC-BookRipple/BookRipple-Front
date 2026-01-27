import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import useQuestionStore from '../stores/useQuestionStore';
import QnACard from '../components/QnAcard';
import Toast from '../components/Toast';

interface QuestionItem {
  id: string;
  type: 'my' | 'ai';
  question: string;
  answer?: string;
}

const SAMPLE_ITEMS: QuestionItem[] = [
  {
    id: 'ai-1',
    type: 'ai',
    question: '설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다.',
    answer:
      '설렘보다는 망설임에 가깝고, 확신보다는 흔들림에 가깝다. 누군가를 좋아하지만 쉽게 다가가지 못하는 마음, 말로 꺼내기 전까지 계속 마음속에 머무는 감정들이 자연스럽게 떠오른다.',
  },
];

export default function ReadingQuestionListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const readingProgress = 60;
  const canAsk = readingProgress >= 50;

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { questions, removeQuestions } = useQuestionStore();
  const [items, setItems] = useState<QuestionItem[]>(SAMPLE_ITEMS);

  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('질문이 등록되었습니다');
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const state = location.state as { toastMessage?: string } | null;
    if (!state?.toastMessage) return;

    setToastMessage(state.toastMessage);
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2000);

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const mergedItems = useMemo(() => {
    const userQuestions: QuestionItem[] = questions.map((q) => ({
      id: q.id,
      type: 'my',
      question: q.question,
    }));

    return [...userQuestions, ...items];
  }, [items, questions]);

  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedIds([]);
      return;
    }
    setIsSelectionMode(true);
  };

  const handleToggleSelect = (id: string) => {
    if (!isSelectionMode) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    const storeIdSet = new Set(questions.map((q) => q.id));
    const selectedStoreIds = selectedIds.filter((id) => storeIdSet.has(id));
    const selectedLocalIds = selectedIds.filter((id) => !storeIdSet.has(id));

    // 1) 내가 작성한 질문(store) 삭제
    if (selectedStoreIds.length > 0) {
      removeQuestions(selectedStoreIds);
    }

    // 2) AI 생성 질문(local items) 삭제 (Q/A 세트 같이 사라짐)
    if (selectedLocalIds.length > 0) {
      setItems((prev) =>
        prev.filter((it) => !selectedLocalIds.includes(it.id)),
      );
    }

    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  const handleDeleteMyQuestion = (id: string) => {
    removeQuestions([id]);
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const handleDeleteLocalItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const startEditAnswer = (id: string) => {
    const current = items.find((it) => it.id === id)?.answer ?? '';
    setEditingAnswerId(id);
    setAnswerDraft(current);
  };

  const cancelEditAnswer = () => {
    setEditingAnswerId(null);
    setAnswerDraft('');
  };

  const saveEditAnswer = () => {
    if (!editingAnswerId) return;

    const trimmed = answerDraft.trim();
    if (!trimmed) return; // 빈 답변 저장 막고 싶으면 유지

    setItems((prev) =>
      prev.map((it) =>
        it.id === editingAnswerId ? { ...it, answer: trimmed } : it,
      ),
    );

    setEditingAnswerId(null);
    setAnswerDraft('');
  };

  if (!canAsk) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px]">
        <div className="sticky top-0 z-50 w-full bg-[#F7F5F1]">
          <Header />
          <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
            <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
              Q&A
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
            <PageHeader depth1="브람스를 좋아하세요..." depth2="독서질문" />
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
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px]">
      <div className="sticky top-0 z-50 w-full bg-[#F7F5F1]">
        <Header />
        <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
          <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
            Q&A
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
          <PageHeader
            depth1="브람스를 좋아하세요..."
            depth2="독서질문"
            actionLabel={isSelectionMode ? '취소' : '선택'}
            onAction={toggleSelectionMode}
          />
        </div>
      </div>

      <main className="flex w-full flex-col items-center gap-[10px] px-[16px] py-[10px] pb-[70px]">
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

        {mergedItems.length === 0 ? (
          <div className="flex flex-col items-center gap-[25px] self-stretch rounded-[10px] bg-white p-[16px] text-[16px] text-[#58534E]">
            아직 작성된 질문이 없어요.
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {mergedItems.map((item, index) => {
              const isSelected = selectedIds.includes(item.id);

              const deleteHandler = isSelectionMode
                ? undefined
                : item.type === 'my'
                  ? () => handleDeleteMyQuestion(item.id)
                  : () => handleDeleteLocalItem(item.id);

              const cardClassName = isSelected
                ? 'border border-[#58534E]'
                : 'border border-transparent';

              return (
                <Fragment key={item.id}>
                  {item.type === 'my' ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        isSelectionMode
                          ? handleToggleSelect(item.id)
                          : navigate(`/reading/question/others/${item.id}`)
                      }
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter' && e.key !== ' ') return;
                        e.preventDefault();
                        isSelectionMode
                          ? handleToggleSelect(item.id)
                          : navigate(`/reading/question/others/${item.id}`);
                      }}
                      className="w-full"
                    >
                      <QnACard
                        variant="my-question"
                        content={item.question}
                        className={cardClassName}
                        onDelete={deleteHandler}
                      />
                    </div>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (isSelectionMode) handleToggleSelect(item.id);
                      }}
                      onKeyDown={(e) => {
                        if (!isSelectionMode) return;
                        if (e.key !== 'Enter' && e.key !== ' ') return;
                        e.preventDefault();
                        handleToggleSelect(item.id);
                      }}
                      className="w-full"
                    >
                      <div className="flex w-full flex-col gap-[10px]">
                        <QnACard
                          variant="reading-ai-question"
                          content={item.question}
                          className={cardClassName}
                          onDelete={deleteHandler}
                        />

                        {item.answer && (
                          <QnACard
                            variant="answer"
                            content={item.answer}
                            onEdit={() => startEditAnswer(item.id)}
                            isEditing={editingAnswerId === item.id}
                            draft={
                              editingAnswerId === item.id ? answerDraft : ''
                            }
                            onChangeDraft={setAnswerDraft}
                            onCancel={cancelEditAnswer}
                            onSave={saveEditAnswer}
                            showEditIcon={!isSelectionMode} // (선택) 선택모드에서 연필 숨김
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
          </div>
        )}
      </main>

      <div className="fixed bottom-0 z-50 flex h-[85px] w-full flex-col items-center justify-center gap-[10px] bg-[#F7F5F1] px-[20px] pt-[12px] pb-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
        <Button onClick={() => navigate('/reading/question/write')}>
          사람들에게 질문하기
        </Button>
      </div>

      {/* 토스트 */}
      <div
        className={`pointer-events-none fixed left-1/2 z-20 -translate-x-1/2 transition-all duration-300 ease-in-out ${
          toastVisible
            ? 'bottom-[100px] translate-y-0 opacity-100'
            : 'bottom-[80px] translate-y-[10px] opacity-0'
        }`}
      >
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </div>
  );
}
