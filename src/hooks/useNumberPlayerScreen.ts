import { Alert } from "react-native";
import { router } from "expo-router";

import { useEdhTable } from "@/hooks/useEdhTable";

export const MIN_STARTING_LIFE = 1;
export const MAX_STARTING_LIFE = 999;

export function useNumberPlayerScreen() {
  const {
    numberOfPlayers,
    resetAll,
    setNumberOfPlayers,
    buttonClicked,
    setButtonClicked,
    startingLife,
    setStartingLife,
  } = useEdhTable();

  const handlePlayerCountSelect = (value: 2 | 3 | 4) => {
    setNumberOfPlayers(value);
    setButtonClicked(value, true);
  };

  const handleStartingLifeChange = (delta: number) => {
    setStartingLife(
      Math.min(
        MAX_STARTING_LIFE,
        Math.max(MIN_STARTING_LIFE, startingLife + delta),
      ),
    );
  };

  const handleStartGame = () => {
    if (
      numberOfPlayers === 2 ||
      numberOfPlayers === 3 ||
      numberOfPlayers === 4
    ) {
      router.navigate("/screen/edhTable");
      return;
    }

    Alert.alert(
      "Choose players",
      "Please select how many players are in the game before starting.",
    );
  };

  const handleBack = () => {
    resetAll();
    router.navigate("/screen/home");
  };

  return {
    buttonClicked,
    handleBack,
    handlePlayerCountSelect,
    handleStartGame,
    handleStartingLifeChange,
    numberOfPlayers,
    startingLife,
  };
}

