import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header.tsx';
import PageHeader from '../../components/PageHeader.tsx';
import { createQuestion } from '../../api/questionApi.ts';

export default function ReadingQuestionWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookTitle =
    (location.state as { bookTitle?: string } | null)?.bookTitle ?? '책 제목';
  const { bookId } = useParams<{ bookId: string }>();

  const [question, setQuestion] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const trimmed = question.trim();
    if (!trimmed) {
      textareaRef.current?.focus();
      return;
    }
    if (!bookId) return;

    try {
      setIsSubmitting(true);

      const res = await createQuestion({
        bookId: Number(bookId),
        body: { content: trimmed },
      });

      if (!res?.isSuccess) {
        throw new Error(res?.message || '질문 등록 실패');
      }

      setQuestion('');
      navigate(`/books/${bookId}/questions`, {
        state: { toastMessage: '질문이 등록되었습니다', bookTitle },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px] text-[#4C4540]">
      <Header />
      <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] pt-[20px] pb-[10px]">
        <PageHeader depth1={bookTitle} depth2="질문하기" />
      </div>

      <main className="flex h-[298px] shrink-0 flex-col items-start gap-[10px] self-stretch px-[16px] py-[10px]">
        <textarea
          ref={textareaRef}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="질문을 입력해주세요."
          autoFocus
          className="flex flex-1 items-start gap-[10px] self-stretch rounded-[16px] bg-[#FFFFFF] px-[16px] py-[14px] font-sans text-[16px] leading-normal font-[400] text-[#58534E] outline-none"
        />
      </main>

      <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[18px] py-[10px]">
        <div className="flex flex-col items-start gap-[10px] self-stretch border-t-[1px] border-[#58534E] py-[14px]">
          <div className="flex items-center justify-end gap-[10px] self-stretch">
            <button
              className="font-sans text-[18px] leading-normal font-[500] text-[#58534E]"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              질문 등록
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
