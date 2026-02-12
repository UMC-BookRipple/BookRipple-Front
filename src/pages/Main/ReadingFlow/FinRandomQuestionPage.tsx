import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../../components/Header';
import PageHeader from '../../../components/PageHeader';
import TextInput from '../../../components/TextInput';
import Toast from '../../../components/Toast';
import QnACard from '../../../components/QnAcard';
import BackIcon from '../../../assets/icons/M-Vector.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  createQuestionAnswer,
  patchReadingAnswer,
  getQuestionAnswers,
  getReadingQuestions,
  type AnswerItem,
  type ReadingAiQnAItem,
} from '../../../api/questionApi';

type RandomQuestionLocationState = {
  mode: 'during' | 'after';
  bookTitle?: string;
  question: string;
  bookId?: number;

  // during
  readingQuestionId?: number;
  // after
  questionId?: number;
};

export default function FinRandomQuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const state = (location.state as RandomQuestionLocationState | null) ?? null;

  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);

  const mode = useMemo(() => {
    return (
      state?.mode ??
      (searchParams.get('mode') as 'during' | 'after' | null) ??
      null
    );
  }, [state?.mode, searchParams]);

  const bookTitle = useMemo(() => {
    return state?.bookTitle ?? searchParams.get('bookTitle') ?? '책 제목';
  }, [state?.bookTitle, searchParams]);

  const questionText = useMemo(() => {
    return state?.question ?? searchParams.get('question') ?? '';
  }, [state?.question, searchParams]);

  const bookId = useMemo(() => {
    const fromState = state?.bookId;
    const fromQuery = searchParams.get('bookId');
    const n =
      typeof fromState === 'number'
        ? fromState
        : fromQuery
          ? Number(fromQuery)
          : NaN;
    return Number.isFinite(n) ? n : null;
  }, [state?.bookId, searchParams]);

  const readingQuestionId = useMemo(() => {
    const fromState = state?.readingQuestionId;
    const fromQuery = searchParams.get('readingQuestionId');
    const n =
      typeof fromState === 'number'
        ? fromState
        : fromQuery
          ? Number(fromQuery)
          : NaN;
    return Number.isFinite(n) ? n : null;
  }, [state?.readingQuestionId, searchParams]);

  const questionId = useMemo(() => {
    const fromState = state?.questionId;
    const fromQuery = searchParams.get('questionId');
    const n =
      typeof fromState === 'number'
        ? fromState
        : fromQuery
          ? Number(fromQuery)
          : NaN;
    return Number.isFinite(n) ? n : null;
  }, [state?.questionId, searchParams]);

  useEffect(() => {
    if (!state) return;

    const params = new URLSearchParams();
    params.set('mode', state.mode);
    if (state.bookTitle) params.set('bookTitle', state.bookTitle);
    if (state.question) params.set('question', state.question);
    if (typeof state.bookId === 'number')
      params.set('bookId', String(state.bookId));
    if (typeof state.readingQuestionId === 'number')
      params.set('readingQuestionId', String(state.readingQuestionId));
    if (typeof state.questionId === 'number')
      params.set('questionId', String(state.questionId));

    navigate(
      { pathname: location.pathname, search: `?${params.toString()}` },
      { replace: true },
    );
  }, [state]);

  useEffect(() => {
    if (!mode || !questionText) {
      navigate(-1);
      return;
    }

    if (mode === 'during') {
      if (!readingQuestionId || !bookId) {
        navigate(-1);
        return;
      }
    }

    if (mode === 'after') {
      if (!questionId) {
        navigate(-1);
        return;
      }
    }
  }, [mode, questionText, readingQuestionId, questionId, bookId, navigate]);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!mode) return;

      try {
        if (mode === 'after' && questionId) {
          const res = await getQuestionAnswers(questionId);
          if (!alive) return;

          if (!res?.isSuccess) return;
          const raw = res.result?.ansList;
          if (!Array.isArray(raw)) return;

          // 내 답변(isMine=true) 하나만 가져와서 표시
          const mine = (raw as AnswerItem[]).find((a) => a.isMine);
          if (mine?.content) setAnswer(mine.content);
        }

        if (mode === 'during' && bookId && readingQuestionId) {
          const res = await getReadingQuestions({
            bookId,
            lastId: null,
            size: 50,
          });
          if (!alive) return;

          if (!res?.isSuccess) return;

          const list = Array.isArray((res.result as any)?.readingAiQnAS)
            ? ((res.result as any).readingAiQnAS as ReadingAiQnAItem[])
            : [];

          const found = list.find((x) => x.id === readingQuestionId);
          if (typeof found?.answer === 'string' && found.answer.trim()) {
            setAnswer(found.answer);
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, [mode, questionId, bookId, readingQuestionId]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showToast = () => {
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2000);
  };

  const handleSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (!mode) return;

    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      setAnswer(trimmed);

      if (mode === 'during') {
        if (!readingQuestionId) return;

        await patchReadingAnswer({
          readingQuestionId,
          body: { content: trimmed },
        });
      } else {
        if (!questionId) return;

        await createQuestionAnswer({
          questionId,
          body: { content: trimmed },
        });
      }

      showToast();
    } finally {
      inFlightRef.current = false;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start bg-[#F7F5F1] pb-[30px]">
      <Header />
      <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
        <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
          Q&A
        </p>
      </div>
      <div className="flex items-center gap-[10px] self-stretch px-[20px] py-[10px]">
        <div className="flex items-center gap-[16px]">
          <img
            src={BackIcon}
            alt="뒤로가기"
            className="h-[18px] w-[9px]"
            onClick={() => navigate(-1)}
          />
          <p className="mx-auto max-w-[260px] truncate text-center font-sans text-[18px] leading-normal font-medium text-[#58534E]">
            {bookTitle}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
        <PageHeader depth1={bookTitle} depth2="랜덤질문" />
      </div>

      <main className="flex flex-col items-center gap-[20px] self-stretch px-[16px] py-[10px]">
        <QnACard variant="random-question" content={questionText ?? ''} />
        {answer && <QnACard variant="answer" content={answer} />}
      </main>

      {/* 하단 입력창 영역 */}
      <div className="fixed right-0 bottom-0 left-0 z-10 bg-[#F7F5F1] px-[16px] pt-[10px] pb-[20px]">
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={async (v) => {
            await handleSubmit(v);
            setInput('');
          }}
        />
      </div>

      {/* 토스트 알림 */}
      <div
        className={`pointer-events-none fixed left-1/2 z-20 -translate-x-1/2 transition-all duration-300 ease-in-out ${
          toastVisible
            ? 'bottom-[100px] translate-y-0 opacity-100'
            : 'bottom-[80px] translate-y-[10px] opacity-0'
        }`}
      >
        <Toast visible={toastVisible} message="기록이 완료되었습니다" />
      </div>
    </div>
  );
}
