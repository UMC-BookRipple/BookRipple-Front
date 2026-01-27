import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import useMemoStore from '../stores/useMemoStore';

export default function ReadingMemoWritePage() {
  const navigate = useNavigate();
  const [memo, setMemo] = useState('');
  const addMemo = useMemoStore((state) => state.addMemo);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedMemo = memo.trim();
    if (!trimmedMemo) {
      textareaRef.current?.focus();
      return;
    }
    addMemo(trimmedMemo);
    setMemo('');
    navigate('/reading/memo');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#4C4540]">
      <Header />
      <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] pt-[20px] pb-[10px]">
        <PageHeader depth1="책 제목" depth2="독서 메모" />
      </div>

      <main className="flex h-[298px] shrink-0 flex-col items-start gap-[10px] self-stretch px-[16px] py-[10px]">
        <textarea
          ref={textareaRef}
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          placeholder="메모를 입력해주세요."
          autoFocus
          className="flex flex-1 items-start gap-[10px] self-stretch rounded-[16px] bg-[#FFFFFF] px-[16px] py-[14px] font-sans text-[16px] leading-normal font-[400] text-[#58534E] not-italic outline-none"
        />
      </main>
      <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[18px] py-[10px]">
        <div className="flex flex-col items-start gap-[10px] self-stretch border-t-[1px] border-[#58534E] py-[14px]">
          <div className="flex items-center justify-end gap-[10px] self-stretch">
            <button
              className="font-sans text-[18px] leading-normal font-[500] text-[#58534E] not-italic"
              onClick={handleSubmit}
            >
              작성하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
