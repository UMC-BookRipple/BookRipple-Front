import { create } from 'zustand';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'ended';

interface TimerState {
  status: TimerStatus;
  elapsedSeconds: number;
  startPage: number;
  endPage: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  end: () => void;
  tick: () => void;
  setStartPage: (value: number) => void;
  setEndPage: (value: number) => void;
}

const useTimerStore = create<TimerState>((set) => ({
  status: 'idle',
  elapsedSeconds: 0,
  startPage: 1,
  endPage: 210,
  start: () => set({ status: 'running' }),
  pause: () => set({ status: 'paused' }),
  resume: () => set({ status: 'running' }),
  end: () => set({ status: 'ended' }),
  tick: () => set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),
  setStartPage: (value) => set({ startPage: value }),
  setEndPage: (value) => set({ endPage: value }),
}));

export default useTimerStore;
