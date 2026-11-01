import { useMemo, useState } from "react";
import { router } from "expo-router";

import { useEdhTable } from "@/hooks/useEdhTable";
import {
  adjustCommanderDamage,
  adjustLife,
  createInitialPlayers,
  getDefaultPlayerState,
  getPlayerCount,
  incrementCounter,
  resetCounter,
  resetRound,
  type PlayerState,
} from "@/domain/edhTable";

export function useEdhTableScreen() {
  const { numberOfPlayers, startingLife } = useEdhTable();
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [coinSide, setCoinSide] = useState<"Heads" | "Tails" | null>(null);
  const [players, setPlayers] = useState<Record<number, PlayerState>>(() => {
    const basePlayers = createInitialPlayers();
    return Object.fromEntries(
      Object.entries(basePlayers).map(([playerNumber, player]) => {
        const key = Number(playerNumber);
        return [
          key,
          {
            ...player,
            startingLife,
            life: startingLife,
          },
        ];
      }),
    );
  });

  const playerCount = useMemo(
    () => getPlayerCount(numberOfPlayers),
    [numberOfPlayers],
  );

  const handleAdjustLife = (player: number, delta: number) => {
    setPlayers((prev) => adjustLife(prev, player, delta));
  };

  const handleIncrementCounter = (
    player: number,
    key: "poison" | "experience",
  ) => {
    setPlayers((prev) => incrementCounter(prev, player, key));
  };

  const handleResetCounter = (player: number, key: "poison" | "experience") => {
    setPlayers((prev) => resetCounter(prev, player, key));
  };

  const handleAdjustCommanderDamage = (
    sourcePlayer: number,
    targetPlayer: number,
    delta: number,
  ) => {
    setPlayers((prev) =>
      adjustCommanderDamage(prev, targetPlayer, sourcePlayer, delta),
    );
  };

  const handleResetRound = () => {
    setPlayers((prev) => resetRound(prev, playerCount));
  };

  const handleResetGame = () => {
    const resetPlayers = Object.fromEntries(
      Array.from({ length: playerCount }, (_, index) => {
        const playerNumber = index + 1;
        return [
          playerNumber,
          {
            ...getDefaultPlayerState(),
            startingLife,
            life: startingLife,
          },
        ];
      }),
    );

    setPlayers((prev) => ({
      ...prev,
      ...resetPlayers,
    }));
    setDiceValue(null);
    setCoinSide(null);
  };

  const rollDice = () => setDiceValue(Math.floor(Math.random() * 20) + 1);
  const flipCoin = () => setCoinSide(Math.random() > 0.5 ? "Heads" : "Tails");

  const goHome = () => {
    router.navigate("/screen/home");
  };

  return {
    coinSide,
    diceValue,
    flipCoin,
    goHome,
    handleAdjustCommanderDamage,
    handleAdjustLife,
    handleIncrementCounter,
    handleResetCounter,
    handleResetGame,
    handleResetRound,
    playerCount,
    players,
    rollDice,
  };
}
