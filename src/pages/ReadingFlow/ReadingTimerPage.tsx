import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ReadingMark from '../../components/ReadingMark';
import useTimerStore from '../../stores/useTimerStore';
import logo from '../../assets/icons/logo.svg';
import { pauseReading, startReading } from '../../api/timerApi';
import { useSwipeNavigate } from '../../hooks/useSwipeNavigate';
import { useBookTitle } from '../../hooks/useBookTitle';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export default function ReadingTimerPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  // book title
  const bookTitle = useBookTitle(numericBookId) || '책 제목';

  // session id
  const [sessionId, setSessionId] = useState<number | null>(() => {
    const saved = sessionStorage.getItem(`reading_session_${bookId ?? ''}`);
    return saved ? Number(saved) : null;
  });

  // loading
  const [isLoading, setIsLoading] = useState(false);

  // in-flight guard
  const startInFlightRef = useRef(false);
  const pauseInFlightRef = useRef(false);

  // navigate: memo
  const goToMemoList = () => {
    if (!bookId) return;
    navigate(`/books/${bookId}/memos`);
  };

  // navigate: question
  const goToQuestionList = () => {
    if (!bookId) return;
    navigate(`/books/${bookId}/questions`);
  };

  // swipe
  const { onPointerDown, onPointerUp } = useSwipeNavigate({
    onSwipeLeft: goToQuestionList, // 질문 리스트
    onSwipeRight: goToMemoList, // 메모 리스트
    thresholdPx: 80,
    maxVerticalPx: 60,
  });

  const { status, elapsedSeconds, start, pause, resume, end, tick } =
    useTimerStore();

  // tick
  useEffect(() => {
    if (status !== 'running') return undefined;

    const timerId = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [status, tick]);

  const formattedTime = useMemo(
    () => formatTime(elapsedSeconds),
    [elapsedSeconds],
  );

  // 시작하기
  const handleStart = async () => {
    if (!Number.isFinite(numericBookId)) return;
    if (startInFlightRef.current) return;

    startInFlightRef.current = true;
    setIsLoading(true);

    try {
      const { data } = await startReading(numericBookId);

      const sid = data.result.sessionId;
      setSessionId(sid);
      sessionStorage.setItem(`reading_session_${bookId ?? ''}`, String(sid));

      start();
    } catch (e) {
      console.error(e);
    } finally {
      startInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  // 독서 계속하기
  const handleResume = async () => {
    if (!Number.isFinite(numericBookId)) return;
    if (startInFlightRef.current) return;

    startInFlightRef.current = true;
    setIsLoading(true);

    try {
      const { data } = await startReading(numericBookId);

      const sid = data.result.sessionId;
      setSessionId(sid);
      sessionStorage.setItem(`reading_session_${bookId ?? ''}`, String(sid));

      resume();
    } catch (e) {
      console.error(e);
    } finally {
      startInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  // 일시정지
  const handlePause = async () => {
    if (!sessionId) return;
    if (pauseInFlightRef.current) return;

    pauseInFlightRef.current = true;
    setIsLoading(true);

    try {
      await pauseReading(sessionId);
      pause();
    } catch (e) {
      console.error(e);
    } finally {
      pauseInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  // 끝내기
  const handleEnd = () => {
    end();
    navigate(`/books/${bookId}/reading/pages`, {
      state: { sessionId, bookId: numericBookId, bookTitle },
    });
  };

  return (
    <div
      className="min-h-screen bg-[#F7F5F1] pb-30 text-[#4C4540]"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Header />

      <main>
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[42px]">
          <img src={logo} alt="Book Ripple" className="h-[95px] w-auto" />
        </section>

        <section className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[4px]">
          <ReadingMark bookName={bookTitle} />
        </section>

        <section className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[10px]">
          <div className="flex flex-1 items-center justify-center gap-[10px] rounded-[20px] bg-white px-[10px] py-[150px]">
            <p className="font-gmarket text-[36px] leading-normal font-bold text-[#58534E]">
              {formattedTime}
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[16px] py-[6px]">
          {status === 'idle' && (
            <Button
              variant="secondary"
              onClick={handleStart}
              disabled={isLoading}
            >
              시작하기
            </Button>
          )}

          {status === 'running' && (
            <>
              <Button
                variant="secondary"
                onClick={handlePause}
                disabled={isLoading || !sessionId}
              >
                일시정지
              </Button>
              <Button onClick={handleEnd}>끝내기</Button>
            </>
          )}

          {status === 'paused' && (
            <>
              <Button
                variant="secondary"
                onClick={handleResume}
                disabled={isLoading}
              >
                독서 계속하기
              </Button>
              <Button onClick={handleEnd}>끝내기</Button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
