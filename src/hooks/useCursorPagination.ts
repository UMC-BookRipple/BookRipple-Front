import { useCallback, useEffect, useRef, useState } from 'react';

type Cursor = number | null;

export type CursorPageResult<T> = {
  items: T[];
  lastId: Cursor;
  hasNext: boolean;
};

export type CursorFetcher<T> = (args: {
  lastId?: number;
  size: number;
}) => Promise<CursorPageResult<T>>;

type Options = {
  size?: number;
  enabled?: boolean;
  resetKey?: string | number;
};

export function useCursorPagination<T>(
  fetcher: CursorFetcher<T>,
  options: Options = {},
) {
  const size = options.size ?? 20;
  const enabled = options.enabled ?? true;
  const resetKey = options.resetKey;

  const [items, setItems] = useState<T[]>([]);
  const [lastId, setLastId] = useState<Cursor>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  // 중복 호출 방지
  const inFlightRef = useRef(false);

  const reset = useCallback(() => {
    setItems([]);
    setLastId(null);
    setHasNext(true);
    setLoading(false);
    setError(null);
    inFlightRef.current = false;
  }, []);

  const loadFirst = useCallback(async () => {
    if (!enabled) return;
    if (inFlightRef.current) return;

    inFlightRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetcherRef.current({ size });
      setItems(res.items);
      setLastId(res.lastId ?? null);
      setHasNext(Boolean(res.hasNext));
    } catch (e: any) {
      setError(e?.message ?? '목록 조회 실패');
      setHasNext(false);
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, [enabled, size]);

  const loadMore = useCallback(async () => {
    if (!enabled) return;
    if (inFlightRef.current) return;
    if (!hasNext) return;

    inFlightRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetcherRef.current({
        lastId: typeof lastId === 'number' ? lastId : undefined,
        size,
      });

      setItems((prev) => [...prev, ...res.items]);
      setLastId(res.lastId ?? null);
      setHasNext(Boolean(res.hasNext));
    } catch (e: any) {
      setError(e?.message ?? '목록 조회 실패');
      setHasNext(false);
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, [enabled, hasNext, lastId, size]);

  useEffect(() => {
    if (!enabled) return;
    reset();
    void loadFirst();
  }, [enabled, size, resetKey, reset, loadFirst]);

  return {
    items,
    lastId,
    hasNext,
    loading,
    error,
    reset,
    loadFirst,
    loadMore,
  };
}
