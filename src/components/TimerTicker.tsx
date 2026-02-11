import { useEffect } from 'react';
import useTimerStore from '../stores/useTimerStore';

export default function TimerTicker() {
  const status = useTimerStore((s) => s.status);
  const tick = useTimerStore((s) => s.tick);

  useEffect(() => {
    if (status !== 'running') return;

    const id = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(id);
  }, [status, tick]);

  return null;
}
