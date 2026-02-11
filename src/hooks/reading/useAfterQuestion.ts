// 최초 진입 시, after 질문 3개 생성/로드
// refresh 시, 기존 3개 삭제 → 새로 생성
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  batchDeleteMyQuestions,
  createAiAfterQuestions,
} from '../../api/questionApi';

export type UiQuestion = { id: number; content: string };

export function useAfterQuestions(bookId: number | null) {
  const [questionSet, setQuestionSet] = useState<UiQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const inFlightRef = useRef(false);
  const fetchedKeyRef = useRef<string | null>(null);

  const currentQuestion = useMemo(() => {
    if (questionSet.length === 0) return '';
    return questionSet[questionIndex]?.content ?? '';
  }, [questionSet, questionIndex]);

  const fetchAfterQuestions = useCallback(async () => {
    if (!bookId) return;

    const key = `after:${bookId}`;
    if (inFlightRef.current) return;
    if (fetchedKeyRef.current === key) return;

    inFlightRef.current = true;
    setLoadingQuestions(true);

    try {
      const res = await createAiAfterQuestions(bookId);
      const list = res.result.questionList ?? [];
      setQuestionSet(list.map((q) => ({ id: q.id, content: q.content })));
      setQuestionIndex(0);
      fetchedKeyRef.current = key;
    } finally {
      setLoadingQuestions(false);
      inFlightRef.current = false;
    }
  }, [bookId]);

  useEffect(() => {
    void fetchAfterQuestions();
  }, [fetchAfterQuestions]);

  const refreshQuestions = useCallback(async () => {
    if (!bookId) return;
    if (inFlightRef.current) return;

    const idsToDelete = questionSet.map((q) => q.id).filter(Boolean);

    inFlightRef.current = true;
    setLoadingQuestions(true);

    try {
      if (idsToDelete.length > 0) {
        await batchDeleteMyQuestions({ idList: idsToDelete });
      }

      const res = await createAiAfterQuestions(bookId);
      const list = res.result.questionList ?? [];
      setQuestionSet(list.map((q) => ({ id: q.id, content: q.content })));
      setQuestionIndex(0);
    } finally {
      setLoadingQuestions(false);
      inFlightRef.current = false;
    }
  }, [bookId, questionSet]);

  const goPrev = useCallback(() => {
    if (questionSet.length === 0) return;
    setQuestionIndex(
      (prev) => (prev - 1 + questionSet.length) % questionSet.length,
    );
  }, [questionSet.length]);

  const goNext = useCallback(() => {
    if (questionSet.length === 0) return;
    setQuestionIndex((prev) => (prev + 1) % questionSet.length);
  }, [questionSet.length]);

  return {
    questionSet,
    questionIndex,
    setQuestionIndex,
    currentQuestion,
    loadingQuestions,
    goPrev,
    goNext,
    refreshQuestions,
  };
}
