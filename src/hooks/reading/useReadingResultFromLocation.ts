import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { formatHHMMSS, formatKoreanDuration } from '../../utils/formatTime';

export type ReadingResultLocationState = {
  bookTitle?: string;
  progress?: number; // 0~100
  readingTime?: number; // 이번 세션(초)
  totalReadingTime?: number;
  recordId?: number;
};

const clampProgress = (p: number) => {
  if (!Number.isFinite(p)) return 0;
  return Math.max(0, Math.min(100, Math.round(p)));
};

export function useReadingResultFromLocation(defaultBookTitle = '책 제목') {
  const location = useLocation();
  const state = (location.state as ReadingResultLocationState | null) ?? null;

  const bookTitle = state?.bookTitle ?? defaultBookTitle;

  const readingTime = Number(state?.readingTime ?? 0);
  const progress = clampProgress(Number(state?.progress ?? 0));
  const recordId = state?.recordId;

  const readingTimeLabel = useMemo(
    () => formatHHMMSS(readingTime),
    [readingTime],
  );

  const readingTimeSummary = useMemo(
    () => formatKoreanDuration(readingTime),
    [readingTime],
  );

  return {
    state,
    bookTitle,
    readingTime,
    progress,
    recordId,
    readingTimeLabel,
    readingTimeSummary,
  };
}
