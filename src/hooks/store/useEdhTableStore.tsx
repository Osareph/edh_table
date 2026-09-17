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

const buttonClickedInitialState = {
  2: false,
  3: false,
  4: false,
};

function setButtonClicked(playerNumber: number, value: boolean) {
  if (playerNumber === 2) {
    return (state: EdhTableState) => ({
      buttonClicked: {
        ...state.buttonClicked,
        2: value,
        3: !value,
        4: !value,
      },
    });
  } else if (playerNumber === 3) {
    return (state: EdhTableState) => ({
      buttonClicked: {
        ...state.buttonClicked,
        2: !value,
        3: value,
        4: !value,
      },
    });
  } else if (playerNumber === 4) {
    return (state: EdhTableState) => ({
      buttonClicked: {
        ...state.buttonClicked,
        2: !value,
        3: !value,
        4: value,
      },
    });
  }
  return (state: EdhTableState) => ({
    buttonClicked: {
      ...state.buttonClicked,
    },
  });
}

export const useEdhTableStore = create<EdhTableState>()((set) => ({
  numberOfPlayers: 0,
  buttonClicked: {
    2: false,
    3: false,
    4: false,
  },
  setNumberOfPlayers: (value: number) => set({ numberOfPlayers: value }),
  setButtonClicked: (playerNumber: number, value: boolean) =>
    set((state) => ({
      ...setButtonClicked(playerNumber, value)(state),
    })),
  resetAll: () =>
    set({ numberOfPlayers: 0, buttonClicked: buttonClickedInitialState }),
}));
