import { create } from 'zustand';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'ended';

interface TimerState {
  status: TimerStatus;
  elapsedSeconds: number;
  startPage: number | null;
  endPage: number | null;
  start: () => void;
  pause: () => void;
  resume: () => void;
  end: () => void;
  tick: () => void;
  setStartPage: (value: number | null) => void;
  setEndPage: (value: number | null) => void;
  resetPages: () => void;
}

const useTimerStore = create<TimerState>((set) => ({
  status: 'idle',
  elapsedSeconds: 0,

  startPage: null,
  endPage: null,

  start: () => set({ status: 'running' }),
  pause: () => set({ status: 'paused' }),
  resume: () => set({ status: 'running' }),
  end: () => set({ status: 'ended' }),

  tick: () => set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),

  setStartPage: (value) => set({ startPage: value }),
  setEndPage: (value) => set({ endPage: value }),

  resetPages: () => set({ startPage: null, endPage: null }),
}));

export default useTimerStore;
