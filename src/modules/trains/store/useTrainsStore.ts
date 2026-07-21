import { create } from 'zustand'
import type { TrainScheduleSegment } from '../api/trains.api.types';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SelectedInfo {
  numberOfPassengers: number;
  departure: string;
  arrival: string;
  date: string;
}

interface TrainsStore {
  selectedTrain: TrainScheduleSegment | null;
  selectedInfo: SelectedInfo | null;
  selectTrain: (train: TrainScheduleSegment) => void;
  selectInfo: (info: SelectedInfo) => void;
}

const useTrainsStore = create<TrainsStore>()(devtools(
  persist(
    (set, get) => ({
      selectedTrain: null,
      selectedInfo: null,
      selectTrain: (train) => {
        if (get().selectedTrain?.thread.uid !== train.thread.uid) {
          set({ selectedTrain: train });
        }
      },
      selectInfo: (info) => {
        set({ selectedInfo: info });
      },
    }),
    {
      name: 'trains-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedTrain: state.selectedTrain, selectedInfo: state.selectedInfo }),
    }
  )
));

export default useTrainsStore;