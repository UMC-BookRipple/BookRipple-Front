import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import UserNumber from '../../components/UserNumber';
import { createReview } from '../../api/reviewApi';

type LocationState = {
  bookTitle?: string;
};

export default function ReviewWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = useParams<{ bookId: string }>();

  const state = (location.state as LocationState | null) ?? null;
  const bookTitle = state?.bookTitle ?? '책 제목';

  const [review, setReview] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const trimmedReview = review.trim();
    if (!trimmedReview) {
      textareaRef.current?.focus();
      return;
    }
    if (!bookId) return;

    try {
      await createReview(bookId, { content: trimmedReview });

      setReview('');

      navigate(`/books/${bookId}/complete`, {
        state: { toastMessage: '기록이 완료되었습니다' },
      });
    } catch (err) {
      console.error(err);
      alert('감상평 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#58534E]">
      <Header />
      <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] pt-[20px] pb-[10px]">
        <PageHeader depth1={bookTitle} depth2="감상평 작성" />
      </div>

      <main className="flex h-[298px] w-full flex-col items-start gap-[10px] px-[16px] py-[10px]">
        <section className="flex w-full flex-1 flex-col items-start gap-[10px] rounded-[16px] bg-white p-[14px]">
          <UserNumber /> {/* TODO: 사용자 nickName 컴포넌트로 교체 필요 */}
          <textarea
            ref={textareaRef}
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="감상평을 입력해주세요."
            autoFocus
            className="h-full w-full flex-1 resize-none font-sans text-[16px] leading-normal font-normal whitespace-pre-wrap text-[#58534E] not-italic outline-none"
          />
        </section>
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
