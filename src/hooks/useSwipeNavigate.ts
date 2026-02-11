import { useRef } from 'react';

type UseSwipeNavigateOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;

  thresholdPx?: number; // 기본 80
  maxVerticalPx?: number; // 기본 60

  isInteractiveTarget?: (target: EventTarget | null) => boolean;

  disabled?: boolean;
};

export function useSwipeNavigate(options: UseSwipeNavigateOptions) {
  const {
    onSwipeLeft,
    onSwipeRight,
    thresholdPx = 80,
    maxVerticalPx = 60,
    disabled = false,
    isInteractiveTarget = (target) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      return Boolean(
        el.closest('button, a, input, textarea, select, [role="button"]'),
      );
    },
  } = options;

  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;
    if (isInteractiveTarget(e.target)) return;
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;

    const start = startRef.current;
    startRef.current = null;
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = Math.abs(e.clientY - start.y);

    if (dy > maxVerticalPx) return;

    if (dx < -thresholdPx) onSwipeLeft?.();
    else if (dx > thresholdPx) onSwipeRight?.();
  };

  return { onPointerDown, onPointerUp };
}
