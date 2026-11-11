export type PlayerState = {
  life: number;
  poison: number;
  experience: number;
  startingLife: number;
  commanderDamage: Record<number, number>;
};

export const DEFAULT_STARTING_LIFE = 40;
export const STARTING_LIFE_OPTIONS = [20, 40, 60] as const;

const EMPTY_COMMANDER_DAMAGE: Record<number, number> = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

export function getDefaultPlayerState(): PlayerState {
  return {
    life: DEFAULT_STARTING_LIFE,
    poison: 0,
    experience: 0,
    startingLife: DEFAULT_STARTING_LIFE,
    commanderDamage: { ...EMPTY_COMMANDER_DAMAGE },
  };
}

export function getPlayerCount(value: number): number {
  if (value === 2 || value === 3 || value === 4) {
    return value;
  }

  return 2;
}

export function createInitialPlayers(): Record<number, PlayerState> {
  return {
    1: getDefaultPlayerState(),
    2: getDefaultPlayerState(),
    3: getDefaultPlayerState(),
    4: getDefaultPlayerState(),
  };
}

export function getPlayer(
  players: Record<number, PlayerState>,
  playerNumber: number,
): PlayerState {
  return players[playerNumber] ?? getDefaultPlayerState();
}

export function updatePlayer(
  players: Record<number, PlayerState>,
  playerNumber: number,
  updater: (current: PlayerState) => PlayerState,
): Record<number, PlayerState> {
  return {
    ...players,
    [playerNumber]: updater(players[playerNumber] ?? getDefaultPlayerState()),
  };
}

export function adjustLife(
  players: Record<number, PlayerState>,
  playerNumber: number,
  delta: number,
): Record<number, PlayerState> {
  return updatePlayer(players, playerNumber, (current) => ({
    ...current,
    life: Math.max(0, current.life + delta),
  }));
}

export function incrementCounter(
  players: Record<number, PlayerState>,
  playerNumber: number,
  key: "poison" | "experience",
): Record<number, PlayerState> {
  return updatePlayer(players, playerNumber, (current) => ({
    ...current,
    [key]: current[key] + 1,
  }));
}

export function resetCounter(
  players: Record<number, PlayerState>,
  playerNumber: number,
  key: "poison" | "experience",
): Record<number, PlayerState> {
  return updatePlayer(players, playerNumber, (current) => ({
    ...current,
    [key]: 0,
  }));
}

export function setStartingLife(
  players: Record<number, PlayerState>,
  playerNumber: number,
  value: number,
): Record<number, PlayerState> {
  return updatePlayer(players, playerNumber, (current) => ({
    ...current,
    startingLife: value,
    life: value,
  }));
}

export function adjustCommanderDamage(
  players: Record<number, PlayerState>,
  targetPlayer: number,
  sourcePlayer: number,
  delta: number,
): Record<number, PlayerState> {
  const current = players[targetPlayer] ?? getDefaultPlayerState();
  const previousDamage = current.commanderDamage[sourcePlayer] ?? 0;
  const nextCommanderDamage = {
    ...current.commanderDamage,
    [sourcePlayer]: Math.max(0, previousDamage + delta),
  };
  const actualDamageDelta =
    (nextCommanderDamage[sourcePlayer] ?? 0) - previousDamage;

  return {
    ...players,
    [targetPlayer]: {
      ...current,
      life: Math.max(0, current.life - actualDamageDelta),
      commanderDamage: nextCommanderDamage,
    },
  };
}

export function resetRound(
  players: Record<number, PlayerState>,
  playerCount: number,
): Record<number, PlayerState> {
  const nextPlayers: Record<number, PlayerState> = {};

  for (let i = 1; i <= playerCount; i += 1) {
    const current = players[i] ?? getDefaultPlayerState();
    nextPlayers[i] = {
      ...current,
      life: current.startingLife,
      poison: 0,
      experience: current.experience,
      commanderDamage: { ...EMPTY_COMMANDER_DAMAGE },
    };
  }

  return {
    ...players,
    ...nextPlayers,
  };
}

export function resetGame(
  players: Record<number, PlayerState>,
  playerCount: number,
): Record<number, PlayerState> {
  const nextPlayers: Record<number, PlayerState> = {};

  for (let i = 1; i <= playerCount; i += 1) {
    nextPlayers[i] = getDefaultPlayerState();
  }

  return {
    ...players,
    ...nextPlayers,
  };
}
