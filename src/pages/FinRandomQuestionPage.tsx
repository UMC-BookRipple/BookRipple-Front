import { useRef, useState } from 'react';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/TextInput';
import Toast from '../components/Toast';
import QnACard from '../components/QnAcard';
import BackIcon from '../assets/icons/M-Vector.svg';
import { useNavigate } from 'react-router-dom';

const QUESTION =
  '이 책을 끝까지 읽고 나면,\n당신이 끝까지 붙잡고 있던 믿음 중 무엇이 가장 흔들리나요?';

export default function RandomQuestionPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);

  const handleSubmit = (value: string) => {
    setAnswer(value.trim());
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2000);
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
            onClick={() => navigate('/reading/complete')}
          />
          <p className="text-center font-sans text-[18px] leading-normal font-medium text-[#58534E]">
            브람스를 좋아하세요...
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
        <PageHeader depth1="브람스를 좋아하세요..." depth2="랜덤질문" />
      </div>

      <main className="flex flex-col items-center gap-[20px] self-stretch px-[16px] py-[10px]">
        <QnACard variant="random-question" content={QUESTION} />
        {answer && <QnACard variant="answer" content={answer} />}
      </main>

      {/* 하단 입력창 영역 */}
      <div className="fixed right-0 bottom-0 left-0 z-10 bg-[#F7F5F1] px-[16px] pt-[10px] pb-[20px]">
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={(v) => {
            handleSubmit(v);
            setInput(''); // 제출 후 입력창 비우기
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
