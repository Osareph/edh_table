import { useMemo, useState } from "react";
import { router } from "expo-router";

import { useEdhTable } from "@/hooks/useEdhTable";
import {
  adjustCommanderDamage,
  adjustLife,
  createInitialSession,
  type EdhTableSessionState,
  incrementCounter,
  randomizeStartingPlayer,
  resetCounter,
  resetGame,
  resetRound,
} from "@/domain/edhTableSession";
import { getPlayerCount } from "@/domain/edhTable";

export function useEdhTableScreen() {
  const { numberOfPlayers, startingLife } = useEdhTable();
  const [session, setSession] = useState<EdhTableSessionState>(() =>
    createInitialSession(getPlayerCount(numberOfPlayers), startingLife),
  );

  const playerCount = useMemo(
    () => getPlayerCount(numberOfPlayers),
    [numberOfPlayers],
  );

  const handleAdjustLife = (player: number, delta: number) => {
    setSession((prev) => adjustLife(prev, player, delta));
  };

  const handleIncrementCounter = (
    player: number,
    key: "poison" | "experience",
  ) => {
    setSession((prev) => incrementCounter(prev, player, key));
  };

  const handleResetCounter = (player: number, key: "poison" | "experience") => {
    setSession((prev) => resetCounter(prev, player, key));
  };

  const handleAdjustCommanderDamage = (
    sourcePlayer: number,
    targetPlayer: number,
    delta: number,
  ) => {
    setSession((prev) =>
      adjustCommanderDamage(prev, sourcePlayer, targetPlayer, delta),
    );
  };

  const handleResetRound = () => {
    setSession((prev) => resetRound(prev));
  };

  const handleResetGame = () => {
    setSession((prev) => {
      return resetGame({
        ...prev,
        playerCount,
        startingLife,
      });
    });
  };

  const randomizeStartingPlayerAction = () => {
    setSession((prev) => randomizeStartingPlayer(prev));
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
    players: session.players,
    randomizeStartingPlayer: randomizeStartingPlayerAction,
    startingPlayer: session.startingPlayer,
  };
}
