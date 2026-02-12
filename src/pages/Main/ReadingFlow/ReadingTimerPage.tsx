import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import ReadingMark from '../../../components/ReadingMark';
import useTimerStore from '../../../stores/useTimerStore';
import logo from '../../../assets/icons/logo.svg';
import { pauseReading, startReading } from '../../../api/timerApi';
import { useSwipeNavigate } from '../../../hooks/useSwipeNavigate';
import { useBookTitle } from '../../../hooks/useBookTitle';

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

  // resetTimer
  const location = useLocation();
  const navState = (location.state as { resetTimer?: boolean } | null) ?? null;

  useEffect(() => {
    if (!bookId) return;

    if (navState?.resetTimer) {
      sessionStorage.removeItem(`reading_session_${bookId}`);
      setSessionId(null);

      useTimerStore.setState({ status: 'idle', elapsedSeconds: 0 });
      navigate(location.pathname, { replace: true });
    }
  }, [bookId]);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  // in-flight guard
  const startInFlightRef = useRef(false);
  const pauseInFlightRef = useRef(false);
  const endInFlightRef = useRef(false);

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

  const { status, elapsedSeconds, start, pause, resume } = useTimerStore();

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
    } catch (e: any) {
      console.error('독서 시작 오류:', e);

      // 409 Conflict - 이미 진행 중인 세션이 있는 경우
      if (e?.response?.status === 409) {
        const existingSessionId = e?.response?.data?.result?.sessionId;

        if (existingSessionId) {
          // 기존 세션 ID를 사용
          setSessionId(existingSessionId);
          sessionStorage.setItem(
            `reading_session_${bookId ?? ''}`,
            String(existingSessionId),
          );
          start();
          console.log('기존 독서 세션을 계속합니다:', existingSessionId);
        } else {
          alert(
            '이미 진행 중인 독서 세션이 있습니다. 페이지를 새로고침해주세요.',
          );
        }
      } else {
        alert('독서 시작에 실패했습니다. 다시 시도해주세요.');
      }
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
    } catch (e: any) {
      console.error('독서 계속하기 오류:', e);

      // 409 Conflict - 이미 진행 중인 세션이 있는 경우
      if (e?.response?.status === 409) {
        const existingSessionId = e?.response?.data?.result?.sessionId;

        if (existingSessionId) {
          // 기존 세션 ID를 사용
          setSessionId(existingSessionId);
          sessionStorage.setItem(
            `reading_session_${bookId ?? ''}`,
            String(existingSessionId),
          );
          resume();
          console.log('기존 독서 세션을 계속합니다:', existingSessionId);
        } else {
          alert(
            '이미 진행 중인 독서 세션이 있습니다. 페이지를 새로고침해주세요.',
          );
        }
      } else {
        alert('독서를 계속하는데 실패했습니다. 다시 시도해주세요.');
      }
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
  const handleEnd = async () => {
    if (!bookId) return;
    if (endInFlightRef.current) return;

    endInFlightRef.current = true;
    setIsLoading(true);

    try {
      // 일시정지 중복 호출 방지
      if (status === 'running') {
        pause();

        if (sessionId && !pauseInFlightRef.current) {
          pauseInFlightRef.current = true;
          try {
            await pauseReading(sessionId);
          } finally {
            pauseInFlightRef.current = false;
          }
        }
      }
    } catch (e: any) {
      const statusCode = e?.response?.status;
      const code = e?.response?.data?.code;
      if (!(statusCode === 429 && code === 'COMMON_429')) {
        console.error(e);
      }
    } finally {
      navigate(`/books/${bookId}/reading/pages`, {
        state: { sessionId, bookId: numericBookId, bookTitle },
      });

      endInFlightRef.current = false;
      setIsLoading(false);
    }
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
