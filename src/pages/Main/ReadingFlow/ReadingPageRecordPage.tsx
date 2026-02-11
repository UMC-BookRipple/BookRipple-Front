import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import ReadingMark from '../../../components/ReadingMark';
import useTimerStore from '../../../stores/useTimerStore';
import logo from '../../../assets/icons/logo.svg';
import { completeReading, endReading } from '../../../api/timerApi';

type LocationState = {
  sessionId?: number | null;
  bookTitle?: string;
};

export default function ReadingPageRecordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = useParams();

  const numericBookId = Number(bookId);

  const { startPage, endPage, setStartPage, setEndPage, resetPages } =
    useTimerStore();

  const state = (location.state as LocationState | null) ?? null;
  const bookTitle = state?.bookTitle ?? '책 제목';

  const sessionId: number | null =
    state?.sessionId ??
    (() => {
      const saved = sessionStorage.getItem(`reading_session_${bookId ?? ''}`);
      return saved ? Number(saved) : null;
    })();

  const [isLoading, setIsLoading] = useState(false);

  // 로컬 타이머 일시정지 (후에 정지 처리)
  useEffect(() => {
    useTimerStore.setState({ status: 'paused' });
  }, []);

  useEffect(() => {
    resetPages();
  }, [bookId, resetPages]);

  const totalPages = useMemo(() => {
    if (startPage == null || endPage == null) return 0;
    return Math.max(0, endPage - startPage + 1);
  }, [endPage, startPage]);

  const getInputWidth = (value: number | null) => {
    const length = String(value ?? '').length;
    return `${Math.max(1, length) * 0.6 + 0.5}em`;
  };

  const canSubmit =
    !!sessionId &&
    Number.isFinite(numericBookId) &&
    startPage != null &&
    endPage != null &&
    startPage >= 1 &&
    endPage >= 1 &&
    endPage >= startPage;

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!canSubmit || isLoading) return;

    try {
      setIsLoading(true);

      const { data } = await endReading({
        sessionId: sessionId!,
        pagesReadStart: startPage!,
        pagesReadEnd: endPage!,
      });

      const { completed, progress, recordId, readingTime, totalReadingTime } =
        data.result;

      sessionStorage.removeItem(`reading_session_${bookId ?? ''}`);
      useTimerStore.setState({ status: 'idle', elapsedSeconds: 0 });

      if (completed) {
        try {
          await completeReading(numericBookId);
        } catch (err) {
          console.error(err);
        }

        navigate(`/books/${bookId}/complete`, {
          state: {
            progress,
            recordId,
            readingTime,
            totalReadingTime,
            bookTitle,
          },
        });
      } else {
        navigate(`/books/${bookId}/non-complete`, {
          state: {
            progress,
            recordId,
            readingTime,
            totalReadingTime,
            bookTitle,
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] pb-30 text-[#4C4540]">
      <Header />

      <main>
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[42px]">
          <img src={logo} alt="Book Ripple" className="h-[95px] w-auto" />
        </section>

        <section className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[4px]">
          <ReadingMark bookName={bookTitle} />
        </section>

        <form onSubmit={handleSubmit}>
          <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[20px] py-[10px]">
            <div className="flex h-[342px] flex-col items-center justify-center gap-[90px] self-stretch rounded-[20px] bg-[#FFFFFF] px-[10px] py-[120px]">
              <div className="flex w-[174px] flex-col items-center gap-[22px]">
                <div className="font-gmarket flex items-center justify-center gap-1 text-[36px] font-bold text-[#58534E]">
                  <input
                    type="number"
                    min={1}
                    value={startPage ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setStartPage(v === '' ? null : Number(v));
                    }}
                    style={{ width: getInputWidth(startPage) }}
                    className="max-w-[100px] min-w-[30px] border-b border-current bg-transparent text-center transition-all outline-none"
                    aria-label="시작 페이지"
                    disabled={isLoading}
                  />
                  <span className="pb-1">-</span>
                  <input
                    type="number"
                    min={1}
                    value={endPage ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEndPage(v === '' ? null : Number(v));
                    }}
                    style={{ width: getInputWidth(endPage) }}
                    className="max-w-[100px] min-w-[30px] border-b border-current bg-transparent text-center transition-all outline-none"
                    aria-label="종료 페이지"
                    disabled={isLoading}
                  />
                </div>
                <p className="h-[21px] w-[156px] text-center font-sans text-[18px] leading-normal font-[500] text-[#58534E]">
                  총 {totalPages} 페이지 읽었어요
                </p>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="hidden"
          />
        </form>
      </main>
    </div>
  );
}
