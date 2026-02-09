import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import QnACard from '../../components/QnAcard';
import Modal from '../../components/Modal';
import { useModalStore } from '../../stores/ModalStore';
import { useBookTitle } from '../../hooks/useBookTitle';

import {
  deleteQuestion,
  getQuestionAnswers,
  type AnswerItem,
} from '../../api/questionApi.ts';

type AnswerUi = {
  id: number;
  content: string;
  updatedAt: string;
  isMine: boolean;
};

type LocationState = {
  bookTitle?: string;
  questionContent?: string;
  fromBookId?: string | number;
};

export default function ReadingQuestionOthersAnswer() {
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();
  const location = useLocation();

  const { open: openModal } = useModalStore();

  const state = (location.state as LocationState | null) ?? null;

  const questionContent = state?.questionContent;
  const fromBookId = state?.fromBookId;

  const numericQuestionId = Number(questionId);

  const numericFromBookId = useMemo(() => {
    if (typeof fromBookId === 'number') return fromBookId;
    if (typeof fromBookId === 'string') return Number(fromBookId);
    return NaN;
  }, [fromBookId]);

  const fetchedBookTitle = useBookTitle(numericFromBookId);
  const bookTitle = state?.bookTitle ?? fetchedBookTitle ?? '책 제목';

  const [answers, setAnswers] = useState<AnswerUi[]>([]);
  const [loading, setLoading] = useState(false);

  const questionText = questionContent ?? '질문을 불러오지 못했습니다.';

  useEffect(() => {
    if (!questionId) return;
    if (Number.isNaN(numericQuestionId)) return;

    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const res = await getQuestionAnswers(numericQuestionId);

        if (!alive) return;

        if (!res?.isSuccess) {
          console.error('getQuestionAnswers failed:', res?.code, res?.message);
          setAnswers([]);
          return;
        }

        const rawList = res.result?.ansList;
        if (!Array.isArray(rawList)) {
          console.error(
            'Unexpected getQuestionAnswers result shape:',
            res.result,
          );
          setAnswers([]);
          return;
        }

        const list = (rawList as AnswerItem[]).map((a) => ({
          id: a.id,
          content: a.content,
          updatedAt: a.updatedAt,
          isMine: a.isMine,
        }));

        setAnswers(list);
      } catch (err) {
        console.error(err);
        if (!alive) return;
        setAnswers([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [questionId, numericQuestionId]);

  const handleBackToList = () => {
    navigate(-1);
  };

  const handleDeleteMyQuestion = () => {
    if (!questionId) return;
    if (Number.isNaN(numericQuestionId)) return;

    openModal('이 질문을 삭제할까요?', async () => {
      try {
        const res = await deleteQuestion(numericQuestionId);
        if (!res?.isSuccess) {
          console.error('deleteQuestion failed:', res?.code, res?.message);
          return;
        }

        if (Number.isFinite(numericFromBookId)) {
          navigate(`/books/${numericFromBookId}/questions`, {
            state: { bookTitle },
          });
          return;
        }

        navigate(-1);
      } catch (e) {
        console.error(e);
      }
    });
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
          <PageHeader depth1={bookTitle} depth2="독서 질문" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-[225px] self-stretch px-[20px] py-[10px]">
        <button
          type="button"
          onClick={handleBackToList}
          className="font-sans text-[16px] font-normal text-[#58534E] underline underline-offset-4"
        >
          내 질문 목록 보기
        </button>
      </div>

      <section className="flex flex-col items-center gap-[10px] self-stretch px-[16px] py-[10px]">
        <QnACard
          variant="my-question"
          content={questionText}
          onDelete={questionContent ? handleDeleteMyQuestion : undefined}
        />
      </section>

      <main className="flex w-full flex-col items-center gap-[10px] px-[16px] py-[10px]">
        <div className="flex w-full flex-col gap-[10px]">
          {loading ? (
            <div className="rounded-[10px] bg-white p-[16px] text-[16px] text-[#58534E]">
              답변을 불러오는 중...
            </div>
          ) : answers.length === 0 ? (
            <div className="rounded-[10px] bg-white p-[16px] text-[16px] text-[#58534E]">
              아직 등록된 답변이 없어요.
            </div>
          ) : (
            answers.map((a) => (
              <QnACard key={a.id} variant="answer" content={a.content} />
            ))
          )}
        </div>
      </main>

      <Modal />
    </div>
  );
}
