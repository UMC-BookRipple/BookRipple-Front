import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ReadingMark from '../../components/ReadingMark';
import useTimerStore from '../../stores/useTimerStore';
import logo from '../../assets/icons/logo.svg';
import { pauseReading, startReading } from '../../api/timerApi';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export default function ReadingTimerPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  const bookTitle =
    (location.state as { bookTitle?: string } | null)?.bookTitle ?? '책 제목';

  const [sessionId, setSessionId] = useState<number | null>(() => {
    const saved = sessionStorage.getItem(`reading_session_${bookId ?? ''}`);
    return saved ? Number(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const startInFlightRef = useRef(false);
  const pauseInFlightRef = useRef(false);

  // Swipe
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_THRESHOLD_PX = 80;
  const SWIPE_MAX_VERTICAL_PX = 60;

  const isInteractiveTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    return Boolean(
      el.closest('button, a, input, textarea, select, [role="button"]'),
    );
  };

  const goToMemoList = () => {
    if (bookId) navigate(`/books/${bookId}/memos`);
  };

  const goToQuestionList = () => {
    if (bookId) navigate(`/books/${bookId}/questions`);
  };

  const { status, elapsedSeconds, start, pause, resume, end, tick } =
    useTimerStore();

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

  /* 시작(초기) */
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

  /* 재개(독서 계속하기) */
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

  /* 일시정지 */
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
      onPointerDown={(e) => {
        if (isInteractiveTarget(e.target)) return;
        startPointRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const startPt = startPointRef.current;
        startPointRef.current = null;
        if (!startPt) return;

        const diffX = e.clientX - startPt.x;
        const diffY = Math.abs(e.clientY - startPt.y);

        if (diffY > SWIPE_MAX_VERTICAL_PX) return;

        // 왼쪽 스와이프 → 질문 리스트
        if (diffX < -SWIPE_THRESHOLD_PX) {
          goToQuestionList();
          return;
        }

        // 오른쪽 스와이프 → 메모 리스트
        if (diffX > SWIPE_THRESHOLD_PX) {
          goToMemoList();
        }
      }}
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
          <div className="flex flex-1 items-center justify-center gap-[10px] rounded-[20px] bg-white px-[10px] py-[180px]">
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
