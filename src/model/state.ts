export interface StartedRound {
  estimate: number;
}
export interface FinishedRound {
  estimate: number;
  actual: number;
  points: number; // calculated
}
export type Round = StartedRound | FinishedRound;

export function isFinished(round: Round | undefined): round is FinishedRound {
  return !!round && "actual" in round;
}
export function assertFinished(
  round: Round | undefined
): asserts round is FinishedRound {
  if (!isFinished(round)) {
    throw new Error("Round not finished");
  }
}

export type UUID = ReturnType<typeof crypto.randomUUID>;

export interface PlayerInput {
  name: string;
}

export interface Player {
  _id: UUID;
  name: string;
  rounds: Round[];
  totalPoints: number;
}

export interface State {
  // between 2-6 player
  player: Player[];
  // between 0 and 60/playercount
  currentRound: number;
  totalRounds: number;
  phase: "enter-players" | "enter-estimate" | "enter-actual" | "game-over";
}

export type Estimates = Record<Player["_id"], number>;
export type Actuals = Record<Player["_id"], number>;
