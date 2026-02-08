import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import ReadingMark from '../components/ReadingMark';
import logo from '../assets/icons/logo.svg';
import ReadingProgress from '../components/ReadingProgress';

const DIRECTION_QUESTION =
  '이 관계를 바라보는 나의 시선에는 어떤 기대\n나 이상이 섞여 있을까?';

export default function NonCompletePage() {
  const navigate = useNavigate();

  const [isFlipped, setIsFlipped] = useState(false);

  // 예시 값(나중에 실제 값 연결)
  const readingTimeLabel = '01:06:00';
  const readingTimeSummary = '총 1시간 6분 독서했어요';
  const progressValue = 90;

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] pb-[30px]">
      <Header />

      <main>
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[42px]">
          <img src={logo} alt="Book Ripple" className="h-[95px] w-auto" />
        </section>
        <section className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[4px]">
          <ReadingMark bookName="브람스를 좋아하세요..." />
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
                    <ReadingProgress progress={progressValue} />
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
                  {DIRECTION_QUESTION}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    // TODO: 독서중 질문 답변 페이지 라우트로 수정
                    navigate('/random-question');
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

      {/* 하단: 나가기 버튼 1개 */}
      <section className="flex flex-col items-center justify-center gap-[12px] self-stretch px-[20px] pt-[14px] pb-[4px]">
        <Button onClick={() => navigate('/')}>나가기</Button>
      </section>
    </div>
  );
}
