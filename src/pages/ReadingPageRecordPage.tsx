import { useMemo } from 'react';
import Header from '../components/Header';
import ReadingMark from '../components/ReadingMark';
import useTimerStore from '../stores/useTimerStore';
import logo from '../assets/icons/logo.svg';

export default function ReadingPagesRecordPage() {
  const { startPage, endPage, setStartPage, setEndPage } = useTimerStore();

  const totalPages = useMemo(
    () => Math.max(0, endPage - startPage + 1),
    [endPage, startPage],
  );

  const getInputWidth = (value: number) => {
    const length = String(value || '').length;
    return `${Math.max(1, length) * 0.6 + 0.5}em`;
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

        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[20px] py-[10px]">
          <div className="flex h-[342px] flex-col items-center justify-center gap-[90px] self-stretch rounded-[20px] bg-[#FFFFFF] px-[10px] py-[120px]">
            <div className="flex w-[174px] flex-col items-center gap-[22px]">
              <div className="font-gmarket flex items-center justify-center gap-1 text-[36px] font-bold text-[#58534E]">
                <input
                  type="number"
                  min={1}
                  value={startPage}
                  onChange={(event) =>
                    setStartPage(Number(event.target.value || 0))
                  }
                  style={{ width: getInputWidth(startPage) }}
                  className="max-w-[100px] min-w-[30px] border-b border-current bg-transparent text-center transition-all outline-none"
                  aria-label="시작 페이지"
                />
                <span className="pb-1">-</span>
                <input
                  type="number"
                  min={1}
                  value={endPage}
                  onChange={(event) =>
                    setEndPage(Number(event.target.value || 0))
                  }
                  style={{ width: getInputWidth(endPage) }}
                  className="max-w-[100px] min-w-[30px] border-b border-current bg-transparent text-center transition-all outline-none"
                  aria-label="종료 페이지"
                />
              </div>
              <p className="h-[21px] w-[156px] text-center font-sans text-[18px] leading-normal font-[500] text-[#58534E]">
                총 {totalPages} 페이지 읽었어요
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
