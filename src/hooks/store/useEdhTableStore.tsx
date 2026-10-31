import { create } from "zustand";

interface EdhTableState {
  buttonClicked: {
    2: boolean;
    3: boolean;
    4: boolean;
  };
  setButtonClicked: (playerNumber: number, value: boolean) => void;
  numberOfPlayers: number;
  setNumberOfPlayers: (value: number) => void;
  resetAll: () => void;
}

const buttonClickedInitialState: Record<2 | 3 | 4, boolean> = {
  2: false,
  3: false,
  4: false,
};

export const useEdhTableStore = create<EdhTableState>()((set) => ({
  numberOfPlayers: 0,
  buttonClicked: {
    2: false,
    3: false,
    4: false,
  },
  setNumberOfPlayers: (value: number) => set({ numberOfPlayers: value }),
  setButtonClicked: (playerNumber: number, value: boolean) =>
    set((state) => {
      const nextState: Record<2 | 3 | 4, boolean> = { 2: false, 3: false, 4: false };
      const key = playerNumber as 2 | 3 | 4;

      if (key in nextState) {
        nextState[key] = value;
      }

      return {
        ...state,
        numberOfPlayers: value ? playerNumber : 0,
        buttonClicked: nextState,
      };
    }),
  resetAll: () => set({ numberOfPlayers: 0, buttonClicked: buttonClickedInitialState }),
}));