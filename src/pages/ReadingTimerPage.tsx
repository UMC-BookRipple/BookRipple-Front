import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import ReadingMark from '../components/ReadingMark';
import useTimerStore from '../stores/useTimerStore';
import logo from '../assets/icons/logo.svg';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export default function ReadingRecordPage() {
  const navigate = useNavigate();
  const { status, elapsedSeconds, start, pause, resume, end, tick } =
    useTimerStore();

  useEffect(() => {
    if (status !== 'running') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [status, tick]);

  const formattedTime = useMemo(
    () => formatTime(elapsedSeconds),
    [elapsedSeconds],
  );

  const handleEnd = () => {
    end();
    navigate('/reading/pages');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] pb-30 text-[#4C4540]">
      <Header />

      <main>
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[42px]">
          <img src={logo} alt="Book Ripple" className="h-[95px] w-auto" />
        </section>
        <section className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[4px]">
          <ReadingMark bookName="브람스를 좋아하세요..." />
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
            <Button variant="secondary" onClick={start}>
              시작하기
            </Button>
          )}
          {status === 'running' && (
            <>
              <Button variant="secondary" onClick={pause}>
                일시정지
              </Button>
              <Button onClick={handleEnd}>끝내기</Button>
            </>
          )}
          {status === 'paused' && (
            <>
              <Button variant="secondary" onClick={resume}>
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
