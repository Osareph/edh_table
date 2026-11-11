import {
  adjustCommanderDamage as adjustCommanderDamagePlayers,
  adjustLife as adjustLifePlayers,
  createInitialPlayers,
  getDefaultPlayerState,
  incrementCounter as incrementCounterPlayers,
  resetCounter as resetCounterPlayers,
  type PlayerState,
} from "@/domain/edhTable";

export type EdhTableSessionState = {
  playerCount: number;
  startingLife: number;
  startingPlayer: number | null;
  players: Record<number, PlayerState>;
};

export function createInitialSession(
  playerCount: number,
  startingLife: number,
): EdhTableSessionState {
  const nextPlayers = Object.fromEntries(
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
  ) as Record<number, PlayerState>;

  return {
    playerCount,
    startingLife,
    startingPlayer: null,
    players: {
      ...createInitialPlayers(),
      ...nextPlayers,
    },
  };
}

export function adjustLife(
  state: EdhTableSessionState,
  playerNumber: number,
  delta: number,
): EdhTableSessionState {
  return {
    ...state,
    players: adjustLifePlayers(state.players, playerNumber, delta),
  };
}

export function incrementCounter(
  state: EdhTableSessionState,
  playerNumber: number,
  key: "poison" | "experience",
): EdhTableSessionState {
  return {
    ...state,
    players: incrementCounterPlayers(state.players, playerNumber, key),
  };
}

export function resetCounter(
  state: EdhTableSessionState,
  playerNumber: number,
  key: "poison" | "experience",
): EdhTableSessionState {
  return {
    ...state,
    players: resetCounterPlayers(state.players, playerNumber, key),
  };
}

export function adjustCommanderDamage(
  state: EdhTableSessionState,
  sourcePlayer: number,
  targetPlayer: number,
  delta: number,
): EdhTableSessionState {
  return {
    ...state,
    players: adjustCommanderDamagePlayers(
      state.players,
      targetPlayer,
      sourcePlayer,
      delta,
    ),
  };
}

export function resetRound(state: EdhTableSessionState): EdhTableSessionState {
  const nextPlayers = Object.fromEntries(
    Array.from({ length: state.playerCount }, (_, index) => {
      const playerNumber = index + 1;
      const current = state.players[playerNumber] ?? getDefaultPlayerState();

      return [
        playerNumber,
        {
          ...current,
          life: current.startingLife,
          poison: 0,
          experience: current.experience,
          commanderDamage: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
          },
        },
      ];
    }),
  ) as Record<number, PlayerState>;

  return {
    ...state,
    players: {
      ...state.players,
      ...nextPlayers,
    },
    startingPlayer: null,
  };
}

export function resetGame(state: EdhTableSessionState): EdhTableSessionState {
  const nextPlayers = Object.fromEntries(
    Array.from({ length: state.playerCount }, (_, index) => {
      const playerNumber = index + 1;
      return [
        playerNumber,
        {
          ...getDefaultPlayerState(),
          startingLife: state.startingLife,
          life: state.startingLife,
        },
      ];
    }),
  ) as Record<number, PlayerState>;

  return {
    ...state,
    players: {
      ...state.players,
      ...nextPlayers,
    },
    startingPlayer: null,
  };
}

export function randomizeStartingPlayer(
  state: EdhTableSessionState,
): EdhTableSessionState {
  const nextPlayer = Math.floor(Math.random() * state.playerCount) + 1;

  return {
    ...state,
    startingPlayer: nextPlayer,
  };
}
