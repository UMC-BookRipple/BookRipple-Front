import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import PageHeader from '../../../components/PageHeader';
import useMemoStore from '../../../stores/useMemoStore';
import { useBookTitle } from '../../../hooks/useBookTitle';

export default function ReadingMemoWritePage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const numericBookId = Number(bookId);

  const bookTitle = useBookTitle(numericBookId);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [memoTitle, setMemoTitle] = useState('');
  const [page, setPage] = useState('');
  const [memo, setMemo] = useState(''); // context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addMemo, error } = useMemoStore();

  const handleSubmit = async () => {
    if (!numericBookId || Number.isNaN(numericBookId)) {
      alert('bookId가 올바르지 않습니다. URL을 확인해 주세요.');
      return;
    }

    const trimmedTitle = memoTitle.trim();
    const trimmedPage = page.trim();
    const trimmedMemo = memo.trim();

    if (!trimmedTitle || !trimmedPage || !trimmedMemo) {
      if (!trimmedMemo) textareaRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);

      await addMemo(
        { memoTitle: trimmedTitle, context: trimmedMemo, page: trimmedPage },
        numericBookId,
      );

      setMemoTitle('');
      setPage('');
      setMemo('');
      navigate(`/books/${numericBookId}/memos`);
    } catch (err) {
      console.error('메모 추가 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#4C4540]">
      <Header />
      <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] pt-[20px] pb-[10px]">
        <PageHeader depth1={bookTitle || '책 제목'} depth2="독서 메모" />
      </div>

      <section className="flex w-full flex-col gap-[10px] self-stretch px-[16px] py-[10px]">
        <input
          value={memoTitle}
          onChange={(e) => setMemoTitle(e.target.value)}
          placeholder="메모 제목을 입력해주세요."
          className="flex items-start gap-[10px] self-stretch rounded-[16px] bg-[#FFFFFF] px-[16px] py-[14px] font-sans text-[16px] leading-normal font-[400] text-[#58534E] not-italic outline-none"
        />
        <input
          value={page}
          onChange={(e) => setPage(e.target.value)}
          placeholder="페이지를 입력해주세요."
          className="flex items-start gap-[10px] self-stretch rounded-[16px] bg-[#FFFFFF] px-[16px] py-[14px] font-sans text-[16px] leading-normal font-[400] text-[#58534E] not-italic outline-none"
        />
      </section>

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
          {error && (
            <div className="w-full rounded-[10px] bg-white p-[12px] text-[14px] text-red-500">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-[10px] self-stretch">
            <button
              className="font-sans text-[18px] leading-normal font-[500] text-[#58534E] not-italic"
              onClick={handleSubmit}
              disabled={isSubmitting}
              type="button"
            >
              {isSubmitting ? '저장 중...' : '작성하기'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
