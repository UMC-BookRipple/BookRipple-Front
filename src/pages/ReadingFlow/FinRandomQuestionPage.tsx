import { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import TextInput from '../../components/TextInput';
import Toast from '../../components/Toast';
import QnACard from '../../components/QnAcard';
import BackIcon from '../../assets/icons/M-Vector.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createQuestionAnswer,
  patchReadingAnswer,
} from '../../api/questionApi';

type RandomQuestionLocationState = {
  mode: 'during' | 'after';
  bookTitle?: string;
  question: string;

  // during
  readingQuestionId?: number;

  // after
  questionId?: number;
};

export default function RandomQuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as RandomQuestionLocationState | null) ?? null;

  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const mode = state?.mode;
  const bookTitle = state?.bookTitle ?? '책 제목';
  const questionText = state?.question;

  useEffect(() => {
    if (!state || !questionText || !mode) {
      navigate(-1);
      return;
    }

    if (mode === 'during' && !state.readingQuestionId) navigate(-1);
    if (mode === 'after' && !state.questionId) navigate(-1);
  }, [state, questionText, mode, navigate]);

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
    if (!state) return;

    const trimmed = value.trim();
    if (!trimmed) return;

    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      setAnswer(trimmed);

      if (state.mode === 'during') {
        // 방향성 질문 답변 저장(PATCH) — 저장(생성+수정 겸)
        await patchReadingAnswer({
          readingQuestionId: state.readingQuestionId as number,
          body: { content: trimmed },
        });
      } else {
        // 완독 질문 답변 저장(POST)
        await createQuestionAnswer({
          questionId: state.questionId as number,
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
          <p className="text-center font-sans text-[18px] leading-normal font-medium text-[#58534E]">
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
