import { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import ReadingMark from '../../../components/ReadingMark';
import logo from '../../../assets/icons/logo.svg';
import ReadingFlowProgress from '../../../components/ReadingFlowProgress';
import { createAiDuringQuestion } from '../../../api/questionApi';

type LocationState = {
  bookTitle?: string;
  progress?: number; // 0~100
  readingTime?: number; // 이번 세션 독서시간(초)
  totalReadingTime?: number; // 누적 독서시간(초)
  recordId?: number;
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

export default function NonCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, tab } = useParams<{ bookId: string; tab: string }>();

  const state = (location.state as LocationState | null) ?? null;
  const bookTitle = state?.bookTitle ?? '책 제목';

  const [isFlipped, setIsFlipped] = useState(false);

  // end API 응답 기반 값
  const totalReadingTime = state?.totalReadingTime ?? 0;
  const progressValue = useMemo(() => {
    const p = Number(state?.progress ?? 0);
    if (!Number.isFinite(p)) return 0;
    return Math.max(0, Math.min(100, Math.round(p)));
  }, [state?.progress]);

  const readingTimeLabel = useMemo(
    () => formatHHMMSS(totalReadingTime),
    [totalReadingTime],
  );

  const readingTimeSummary = useMemo(
    () => formatKoreanDuration(totalReadingTime),
    [totalReadingTime],
  );

  // 미완독 방향성 질문(1개)
  const [ai, setAi] = useState<{ id: number; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const inFlightRef = useRef(false);
  const fetchedKeyRef = useRef<string | null>(null);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!bookId) return;
    if (ai) return;

    const key = `during:${bookId}`;
    if (inFlightRef.current) return;
    if (fetchedKeyRef.current === key) return;

    inFlightRef.current = true;
    setLoading(true);
    setErrorText(null);

    (async () => {
      try {
        const res = await createAiDuringQuestion(Number(bookId));
        setAi({ id: res.result.id, content: res.result.content });
        fetchedKeyRef.current = key;
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 429) {
          setErrorText('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          setErrorText('질문을 불러오지 못했습니다.');
        }
      } finally {
        setLoading(false);
        inFlightRef.current = false;
      }
    })();
  }, [bookId, ai]);

  return (
    <div className="min-h-screen bg-[#F7F5F1] pb-[30px]">
      <Header />

      <main>
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[42px]">
          <img src={logo} alt="Book Ripple" className="h-[95px] w-auto" />
        </section>

        <section className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[4px]">
          <ReadingMark bookName={bookTitle} />
        </section>

        {/* 카드 영역 */}
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[20px] pt-[16px] pb-[10px]">
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
              {/* FRONT (독서 기록 카드) */}
              <div
                className="flex flex-col items-center justify-center gap-[10px] self-stretch rounded-[20px] bg-white px-[10px] py-[30px]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex flex-col items-center gap-[7px] px-[10px] py-[60px]">
                  <div className="font-gmarket self-stretch text-center text-[36px] leading-normal font-bold text-[#58534E]">
                    {readingTimeLabel}
                  </div>
                  <p className="text-center text-[18px] leading-normal font-medium text-[#58534E]">
                    {readingTimeSummary}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-[10px] self-stretch">
                  <div className="h-[27px] self-stretch px-[25px]">
                    <ReadingFlowProgress progress={progressValue} />
                  </div>
                  <span className="text-[18px] font-medium text-[#58534E]">
                    독서율 {progressValue}%
                  </span>
                </div>

                <p className="pb-[30px] text-center text-[14px] leading-normal font-medium text-[#BDB7B2]">
                  화면을 클릭시 질문으로 넘어갑니다
                </p>
              </div>

              {/* BACK (질문 카드: 1개) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center self-stretch rounded-[20px] bg-white px-[18px] py-[30px]"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <p className="text-center text-[16px] leading-normal font-medium whitespace-pre-line text-[#58534E]">
                  {loading
                    ? '질문을 불러오는 중...'
                    : errorText
                      ? errorText
                      : (ai?.content ?? '질문을 불러오지 못했습니다.')}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    if (!bookId || !ai) return;

                    navigate(`/books/${bookId}/random-question`, {
                      state: {
                        mode: 'during',
                        readingQuestionId: ai.id,
                        question: ai.content,
                        bookTitle,
                      },
                    });
                  }}
                  className="mt-[34px] text-center text-[16px] leading-normal font-medium text-[#58534E] underline underline-offset-4"
                >
                  답변하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 */}
      <section className="flex flex-col items-center justify-center gap-[12px] self-stretch px-[20px] pt-[14px] pb-[4px]">
        <Button onClick={() => navigate(`/${tab}/select/${bookId}`)}>
          나가기
        </Button>
      </section>
    </div>
  );
}
