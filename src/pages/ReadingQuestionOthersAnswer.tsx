import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import QnACard from '../components/QnAcard';
import useQuestionStore from '../stores/useQuestionStore';

export default function ReadingQuestionOthersAnswer() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { questions, removeQuestions } = useQuestionStore();

  const question = useMemo(() => {
    if (!id) return null;
    return questions.find((q) => q.id === id) ?? null;
  }, [id, questions]);

  const handleDelete = () => {
    if (!id) return;
    removeQuestions([id]);
    navigate('/reading/questions');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F7F5F1] pb-[30px]">
      <div className="sticky top-0 z-50 w-full bg-[#F7F5F1]">
        <Header />
        <div className="flex h-[80px] items-center gap-[10px] self-stretch px-[14px] pt-[30px] pb-[10px]">
          <p className="font-gmarket flex flex-1 items-center gap-[10px] px-[5px] py-[12px] text-[20px] leading-normal font-bold text-[#58534E]">
            Q&A
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch px-[14px] py-[6px]">
          <PageHeader depth1="브람스를 좋아하세요..." depth2="독서질문" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-[225px] self-stretch px-[20px] py-[10px]">
        <button
          type="button"
          onClick={() => navigate('/reading/questions')}
          className="font-sans text-[16px] font-normal text-[#58534E] underline underline-offset-4"
        >
          내 질문 목록 보기
        </button>
      </div>

      <section className="flex flex-col items-center gap-[10px] self-stretch px-[16px] py-[10px]">
        <QnACard
          variant="my-question"
          content={question?.question ?? '질문을 찾을 수 없습니다.'}
          onDelete={question ? handleDelete : undefined}
        />
      </section>

      {/* 답변은 현재 데이터 구조가 없어서 임시로 비워둠 */}
      <main className="flex w-full flex-col items-center gap-[10px] px-[16px] py-[10px]">
        <div className="flex w-full flex-col gap-[10px]">
          {/* TODO: id에 따른 답변 목록 렌더링 */}
        </div>
      </main>
    </div>
  );
}
