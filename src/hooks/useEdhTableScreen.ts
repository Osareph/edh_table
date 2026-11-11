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
  const [startingPlayer, setStartingPlayer] = useState<number | null>(null);
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
    setStartingPlayer(null);
  };

  const randomizeStartingPlayer = () => {
    const nextPlayer = Math.floor(Math.random() * playerCount) + 1;
    setStartingPlayer(nextPlayer);
  };

  const goHome = () => {
    router.navigate("/screen/home");
  };

  return {
    goHome,
    handleAdjustCommanderDamage,
    handleAdjustLife,
    handleIncrementCounter,
    handleResetCounter,
    handleResetGame,
    handleResetRound,
    playerCount,
    players,
    randomizeStartingPlayer,
    startingPlayer,
  };
}