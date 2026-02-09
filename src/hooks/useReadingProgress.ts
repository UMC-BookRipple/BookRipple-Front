import { useEffect, useState } from 'react';
import { getLibraryBookDetail } from '../api/libraryApi';

export function useReadingProgress(bookId: number) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(bookId)) return;

    let alive = true;

    (async () => {
      try {
        const { data } = await getLibraryBookDetail(bookId);
        const p = Number(data?.result?.progressPercent ?? 0);
        const safe = Number.isFinite(p) ? Math.max(0, Math.min(100, p)) : 0;
        if (alive) setProgress(safe);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, [bookId]);

  return progress;
}
