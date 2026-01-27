import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import ReadCompleteMark from '../components/ReadCompleteMark';
import ReadingProgress from '../components/ReadingProgress';
import readCompleteIcon from '../assets/icons/M-ReadComplete.svg';
import refreshIcon from '../assets/icons/M-refresh1.svg';
import refreshPressedIcon from '../assets/icons/M-refresh2.svg';
import BackwardIcon from '../assets/icons/Backward.svg';
import ForwardIcon from '../assets/icons/Forward.svg';

// 기존 3개(초기 세트)
const INITIAL_QUESTIONS = [
  '이 책을 끝까지 읽고 나면,\n당신이 끝까지 붙잡고 있던 믿음 중 무엇이 가장 흔들리나요?',
  '이 책을 통해 새롭게 발견한 나의 감정은 무엇인가요?',
  '이 책이 당신의 일상에 남긴 가장 큰 변화는 무엇인가요?',
];

// ✅ refresh 시 “새 질문 세트”를 만들기 위한 목업 풀(나중에 API로 교체)
const QUESTION_BANK = [
  '이 책의 한 문장을 오늘의 나에게 선물한다면 무엇인가요?',
  '이 책을 읽기 전의 나와 읽은 후의 나는 무엇이 달라졌나요?',
  '주인공의 선택 중 내가 가장 공감한 순간은 언제인가요?',
  '이 책이 던진 질문 중 아직 답을 못 찾은 것은 무엇인가요?',
  '이 책을 친구에게 추천한다면, 어떤 사람에게 추천하고 싶나요?',
  '이 책의 장면 하나를 내 삶의 기억과 연결한다면 어떤 장면인가요?',
  '이 책이 나의 가치관을 흔든 지점은 어디였나요?',
  '이 책을 읽으며 피하고 싶었던 감정이 있었나요?',
  '이 책이 나에게 남긴 “한 가지 행동 변화”는 무엇인가요?',
];

function pickNewQuestionSet(prevSet: string[]) {
  // prevSet과 겹치지 않게 우선 필터링
  const candidates = QUESTION_BANK.filter((q) => !prevSet.includes(q));

  // 후보가 부족하면(극단 케이스) 전체 풀로
  const pool = candidates.length >= 3 ? candidates : QUESTION_BANK;

  // 셔플 후 3개
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function ReadCompletePage() {
  const navigate = useNavigate();

  const [isFlipped, setIsFlipped] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [questionSet, setQuestionSet] = useState<string[]>(INITIAL_QUESTIONS);
  const [refreshPressed, setRefreshPressed] = useState(false);

  const readingTimeLabel = '01:06:00';
  const readingTimeSummary = '총 1시간 6분 독서했어요';
  const progressValue = 100;

  const currentQuestion = useMemo(
    () => questionSet[questionIndex],
    [questionSet, questionIndex],
  );

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const goPrev = () => {
    setQuestionIndex(
      (prev) => (prev - 1 + questionSet.length) % questionSet.length,
    );
  };
  const goNext = () => {
    setQuestionIndex((prev) => (prev + 1) % questionSet.length);
  };

  const handleRefresh = () => {
    setRefreshPressed(true);
    setQuestionSet((prev) => pickNewQuestionSet(prev));
    setQuestionIndex(0);
    window.setTimeout(() => setRefreshPressed(false), 150);
  };

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] pb-[30px] text-[#58534E]">
      <Header />
      <div className="flex items-center justify-center gap-[10px] self-stretch px-[20px] pt-[40px] pb-[20px]">
        <ReadCompleteMark bookName="브람스를 좋아하세요..." />
      </div>

      <main className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[20px] py-[10px]">
        {/* perspective wrapper */}
        <div className="w-full" style={{ perspective: '1200px' }}>
          {/* flip container */}
          <div
            className="relative w-full cursor-pointer select-none"
            onClick={handleFlip}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 500ms ease',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {' '}
            {/* FRONT (완독 카드) */}{' '}
            <div
              className="flex flex-col items-center justify-center gap-[27px] self-stretch rounded-[20px] bg-white px-[10px] py-[30px]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src={readCompleteIcon}
                alt="완독"
                className="h-[133px] w-[132px]"
              />
              <div className="flex w-[174px] flex-col items-center gap-[7px]">
                <div className="font-gmarket self-stretch text-center text-[36px] leading-normal font-bold text-[#58534E]">
                  {readingTimeLabel}
                </div>
                <p className="text-center text-[18px] leading-normal font-medium text-[#58534E]">
                  {readingTimeSummary}
                </p>
              </div>

              <div className="flex flex-col items-center gap-[5px] self-stretch">
                <div className="h-[27px] self-stretch px-[25px]">
                  <ReadingProgress progress={progressValue} />
                </div>
                <span className="text-[16px] font-medium text-[#58534E]">
                  독서율 {progressValue}%
                </span>
              </div>

              <p className="flex-[1_0_0] text-center text-[14px] leading-normal font-medium text-[#BDB7B2]">
                화면을 클릭시 질문으로 넘어갑니다
              </p>
            </div>
            {/* BACK (질문 카드) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center self-stretch rounded-[20px] bg-white px-[10px] py-[10px]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* 상단: refresh */}
              <div className="flex w-full items-start justify-end">
                <button
                  type="button"
                  aria-label="질문 새로고침"
                  className="absolute top-[18px] right-[18px] z-10 p-[6px]"
                  onClick={(e) => {
                    stop(e);
                    handleRefresh();
                  }}
                  onPointerDown={(e) => {
                    stop(e);
                    setRefreshPressed(true);
                  }}
                  onPointerUp={(e) => {
                    stop(e);
                    setRefreshPressed(false);
                  }}
                  onPointerCancel={() => setRefreshPressed(false)}
                  onPointerLeave={() => setRefreshPressed(false)}
                >
                  <img
                    src={refreshPressed ? refreshPressedIcon : refreshIcon}
                    alt="새로고침"
                    className="h-[30px] w-[30px]"
                  />
                </button>
              </div>

              {/* 가운데: 질문 + 좌우 이동 */}
              <div className="mt-[18px] flex w-full items-center justify-between gap-[12px]">
                <button
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    goPrev();
                  }}
                  className="p-[6px]"
                  aria-label="이전 질문"
                >
                  <img
                    src={BackwardIcon}
                    alt="이전"
                    className="h-[30px] w-[18px]"
                  />
                </button>

                <p className="flex-1 text-center text-[16px] leading-normal font-medium whitespace-pre-line text-[#58534E]">
                  {currentQuestion}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    goNext();
                  }}
                  className="p-[6px]"
                  aria-label="다음 질문"
                >
                  <img
                    src={ForwardIcon}
                    alt="다음"
                    className="h-[30px] w-[18px]"
                  />
                </button>
              </div>

              {/* 하단: 답변하기 */}
              <button
                type="button"
                onClick={(e) => {
                  stop(e);
                  navigate('/random-question');
                }}
                className="mt-[60px] text-center text-[18px] leading-normal font-medium text-[#58534E] underline underline-offset-4"
              >
                답변하기
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="flex flex-col items-center justify-center gap-[12px] self-stretch px-[20px] pt-[24px] pb-[4px]">
        <Button variant="secondary" onClick={() => navigate('/review/write')}>
          감상평 작성
        </Button>
        <Button variant="secondary" onClick={() => navigate('/recommend')}>
          추천 도서 보기
        </Button>
        <Button onClick={() => navigate('/')}>나가기</Button>
      </section>
    </div>
  );
}
