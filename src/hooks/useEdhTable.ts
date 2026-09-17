import { useEdhTableStore } from "@/hooks/store/useEdhTableStore";

export function useEdhTable() {
  const numberOfPlayers = useEdhTableStore((state) => state.numberOfPlayers);
  const setNumberOfPlayers = useEdhTableStore(
    (state) => state.setNumberOfPlayers,
  );
  const resetAll = useEdhTableStore((state) => state.resetAll);
  const buttonClicked = useEdhTableStore((state) => state.buttonClicked);
  const setButtonClicked = useEdhTableStore((state) => state.setButtonClicked);
  return {
    numberOfPlayers,
    setNumberOfPlayers,
    resetAll,
    buttonClicked,
    setButtonClicked,
  };
}
