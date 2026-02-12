import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import ReadCompleteMark from '../../../components/ReadCompleteMark';
import ReadingFlowProgress from '../../../components/ReadingFlowProgress';
import readCompleteIcon from '../../../assets/icons/M-ReadComplete.svg';
import refreshIcon from '../../../assets/icons/M-refresh1.svg';
import refreshPressedIcon from '../../../assets/icons/M-refresh2.svg';
import BackwardIcon from '../../../assets/icons/Backward.svg';
import ForwardIcon from '../../../assets/icons/Forward.svg';
import { useModalStore } from '../../../stores/ModalStore';
import RefreshModal from '../../../components/RefreshModal';
import Toast from '../../../components/Toast';
import {
  batchDeleteMyQuestions,
  createAiAfterQuestions,
} from '../../../api/questionApi';

import { useBookTitle } from '../../../hooks/useBookTitle';

type UiQuestion = { id: number; content: string };

type LocationState = {
  bookTitle?: string;
  progress?: number; // 0~100
  readingTime?: number; // 이번 세션 독서시간(초)
  totalReadingTime?: number; // 누적 독서시간(초)
  recordId?: number;
  toastMessage?: string;
};

const formatHHMMSS = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (v: number) => String(v).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
};

const formatKoreanDuration = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);

  if (h <= 0) return `총 ${m}분 독서했어요`;
  return `총 ${h}시간 ${m}분 독서했어요`;
};

export default function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, tab } = useParams<{ bookId: string; tab: string }>();
  const numericBookId = Number(bookId);

  const { open } = useModalStore();

  const state = (location.state as LocationState | null) ?? null;

  const titleFromStore = useBookTitle(numericBookId);
  const bookTitle = state?.bookTitle?.trim() || titleFromStore || '책 제목';

  const [isFlipped, setIsFlipped] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [questionSet, setQuestionSet] = useState<UiQuestion[]>([]);
  const [refreshPressed, setRefreshPressed] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const inFlightRef = useRef(false);
  const fetchedKeyRef = useRef<string | null>(null);

  // 토스트
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const msg = (location.state as LocationState | null)?.toastMessage;
    if (!msg) return;

    setToastMessage(msg);
    setToastVisible(true);

    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2000);

    navigate(location.pathname, { replace: true });
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const readingTime = state?.readingTime ?? 0;

  const progressValue = useMemo(() => {
    const p = Number(state?.progress ?? 100);
    if (!Number.isFinite(p)) return 100;
    return Math.max(0, Math.min(100, Math.round(p)));
  }, [state?.progress]);

  const readingTimeLabel = useMemo(
    () => formatHHMMSS(readingTime),
    [readingTime],
  );

  const readingTimeSummary = useMemo(
    () => formatKoreanDuration(readingTime),
    [readingTime],
  );

  const currentQuestion = useMemo(() => {
    if (questionSet.length === 0) return '';
    return questionSet[questionIndex]?.content ?? '';
  }, [questionSet, questionIndex]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const goPrev = () => {
    if (questionSet.length === 0) return;
    setQuestionIndex(
      (prev) => (prev - 1 + questionSet.length) % questionSet.length,
    );
  };

  const goNext = () => {
    if (questionSet.length === 0) return;
    setQuestionIndex((prev) => (prev + 1) % questionSet.length);
  };

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const fetchAfterQuestions = async () => {
    if (!bookId) return;

    const key = `after:${bookId}`;
    if (inFlightRef.current) return;
    if (fetchedKeyRef.current === key) return;

    inFlightRef.current = true;
    setLoadingQuestions(true);

    try {
      const res = await createAiAfterQuestions(Number(bookId));
      const list = res.result.questionList ?? [];

      const ui: UiQuestion[] = list.map((q) => ({
        id: q.id,
        content: q.content,
      }));

      setQuestionSet(ui);
      setQuestionIndex(0);
      fetchedKeyRef.current = key;
    } finally {
      setLoadingQuestions(false);
      inFlightRef.current = false;
    }
  };

  // 최초 진입 시 완독 질문 3개 생성
  useEffect(() => {
    void fetchAfterQuestions();
  }, [bookId]);

  const refreshQuestions = async () => {
    if (!bookId) return;
    if (inFlightRef.current) return;

    const idsToDelete = questionSet.map((q) => q.id).filter(Boolean);

    inFlightRef.current = true;
    setLoadingQuestions(true);

    try {
      // 1) 기존 3개 삭제
      if (idsToDelete.length > 0) {
        await batchDeleteMyQuestions({ idList: idsToDelete });
      }

      // 2) 새로 생성
      const res = await createAiAfterQuestions(Number(bookId));
      const list = res.result.questionList ?? [];

      setQuestionSet(
        list.map((q) => ({
          id: q.id,
          content: q.content,
        })),
      );
      setQuestionIndex(0);
    } finally {
      setLoadingQuestions(false);
      inFlightRef.current = false;

      window.setTimeout(() => setRefreshPressed(false), 150);
    }
  };

  const handleRefresh = () => {
    if (!bookId) return;
    if (inFlightRef.current) return;

    open('새 질문 3개를 생성할까요?', () => {
      void refreshQuestions();
    });
  };

  const handleAnswer = () => {
    if (!bookId) return;
    const q = questionSet[questionIndex];
    if (!q) return;

    navigate(`/books/${bookId}/random-question`, {
      state: {
        mode: 'after',
        bookTitle,
        questionId: q.id,
        question: q.content,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] pb-[30px] text-[#58534E]">
      <Header />
      <div className="flex items-center justify-center gap-[10px] self-stretch px-[20px] pt-[40px] pb-[20px]">
        <ReadCompleteMark bookName={bookTitle} />
      </div>

      <main className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[20px] py-[10px]">
        <div className="w-full" style={{ perspective: '1200px' }}>
          <div
            className="relative w-full cursor-pointer select-none"
            onClick={handleFlip}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 500ms ease',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* FRONT (완독 카드) */}
            <div
              className="flex flex-col items-center justify-center gap-[27px] self-stretch rounded-[20px] bg-white px-[10px] py-[30px]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src={readCompleteIcon}
                alt="완독"
                className="h-[133px] w-[132px]"
              />
              <div className="flex w-[174px] flex-col items-center gap-[7px]">
                <div className="font-gmarket self-stretch text-center text-[36px] leading-normal font-bold text-[#58534E]">
                  {readingTimeLabel}
                </div>
                <p className="text-center text-[18px] leading-normal font-medium text-[#58534E]">
                  {readingTimeSummary}
                </p>
              </div>

              <div className="flex flex-col items-center gap-[5px] self-stretch">
                <div className="h-[27px] self-stretch px-[25px]">
                  <ReadingFlowProgress progress={progressValue} />
                </div>
                <span className="text-[16px] font-medium text-[#58534E]">
                  독서율 {progressValue}%
                </span>
              </div>

              <p className="flex-[1_0_0] text-center text-[14px] leading-normal font-medium text-[#BDB7B2]">
                화면을 클릭시 질문으로 넘어갑니다
              </p>
            </div>

            {/* BACK (질문 카드) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center self-stretch rounded-[20px] bg-white px-[10px] py-[10px]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* 상단: refresh */}
              <div className="flex w-full items-start justify-end">
                <button
                  type="button"
                  aria-label="질문 새로고침"
                  className="absolute top-[18px] right-[18px] z-10 p-[6px]"
                  disabled={loadingQuestions}
                  onClick={(e) => {
                    stop(e);
                    setRefreshPressed(true);
                    handleRefresh();
                  }}
                  onPointerDown={(e) => {
                    stop(e);
                    setRefreshPressed(true);
                  }}
                  onPointerUp={(e) => {
                    stop(e);
                    setRefreshPressed(false);
                  }}
                  onPointerCancel={() => setRefreshPressed(false)}
                  onPointerLeave={() => setRefreshPressed(false)}
                >
                  <img
                    src={refreshPressed ? refreshPressedIcon : refreshIcon}
                    alt="새로고침"
                    className="h-[30px] w-[30px]"
                  />
                </button>
              </div>

              {/* 가운데: 질문 + 좌우 이동 */}
              <div className="mt-[18px] flex w-full items-center justify-between gap-[12px]">
                <button
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    goPrev();
                  }}
                  className="p-[6px]"
                  aria-label="이전 질문"
                  disabled={questionSet.length === 0}
                >
                  <img
                    src={BackwardIcon}
                    alt="이전"
                    className="h-[30px] w-[18px]"
                  />
                </button>

                <p className="flex-1 text-center text-[16px] leading-normal font-medium whitespace-pre-line text-[#58534E]">
                  {loadingQuestions
                    ? '질문을 불러오는 중...'
                    : currentQuestion || '질문이 없습니다.'}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    goNext();
                  }}
                  className="p-[6px]"
                  aria-label="다음 질문"
                  disabled={questionSet.length === 0}
                >
                  <img
                    src={ForwardIcon}
                    alt="다음"
                    className="h-[30px] w-[18px]"
                  />
                </button>
              </div>

              {/* 하단: 답변하기 */}
              <button
                type="button"
                onClick={(e) => {
                  stop(e);
                  handleAnswer();
                }}
                disabled={questionSet.length === 0 || loadingQuestions}
                className="mt-[60px] text-center text-[18px] leading-normal font-medium text-[#58534E] underline underline-offset-4 disabled:opacity-50"
              >
                답변하기
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="flex flex-col items-center justify-center gap-[12px] self-stretch px-[20px] pt-[24px] pb-[4px]">
        <Button
          variant="secondary"
          onClick={() =>
            navigate(`/books/${bookId}/review/new`, { state: { bookTitle } })
          }
        >
          감상평 작성
        </Button>
        <Button variant="secondary" onClick={() => navigate('/recommend')}>
          추천 도서 보기
        </Button>
        <Button onClick={() => navigate(`/bookshelf/${tab}/select/${bookId}`)}>
          나가기
        </Button>
      </section>

      <RefreshModal />

      {/* 토스트 */}
      <div
        className={`pointer-events-none fixed left-1/2 z-20 -translate-x-1/2 transition-all duration-300 ease-in-out ${toastVisible
            ? 'bottom-[100px] translate-y-0 opacity-100'
            : 'bottom-[80px] translate-y-[10px] opacity-0'
          }`}
      >
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </div>
  );
}
