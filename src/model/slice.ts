import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Actuals,
  Estimates,
  Player,
  PlayerInput,
  State,
  isFinished,
} from "./state";

const initialState: State = {
  player: [],
  currentRound: 0,
  totalRounds: 0,
  phase: "enter-players",
};

const slice = createSlice({
  name: "wizard",

  initialState,

  reducers: {
    setPlayers(state: State, action: PayloadAction<PlayerInput[]>) {
      const count = action.payload.length;

      if (count < 2 || count > 6) {
        throw Error("Only 2-6 players can play this game");
      }
      state.currentRound = 1;
      state.totalRounds = Math.floor(60 / action.payload.length);
      state.player = action.payload.map((p) => ({
        _id: crypto.randomUUID(),
        name: p.name,
        rounds: [],
        totalPoints: 0,
      }));
      state.phase = "enter-estimate";
    },
    setEstimates(state: State, action: PayloadAction<Estimates>) {
      for (const [playerId, estimate] of Object.entries(action.payload)) {
        const player = state.player.find((p) => p._id === playerId);
        if (player) {
          player.rounds.push({ estimate });
        } else {
          console.warn("no player found");
        }
      }
      state.phase = "enter-actual";
    },
    setActuals(state: State, action: PayloadAction<Actuals>) {
      for (const [playerId, actual] of Object.entries(action.payload)) {
        const player = state.player.find((p) => p._id === playerId);
        if (!player) {
          console.warn("no player found");
          continue;
        }
        const currentRound = player.rounds.at(-1);
        if (!isFinished(currentRound)) {
          console.warn("no round is finished yet");
          continue;
        }
        currentRound.actual = actual;
        currentRound.points = calcPoints(currentRound.estimate, actual);
        player.totalPoints = calcTotalPoints(player);
      }
      state.currentRound++;
      state.phase =
        state.currentRound === state.totalRounds
          ? "enter-estimate"
          : "game-over";
    },
    restartGame() {
      return initialState;
    },
  },
});

function calcPoints(estimate: number, actual: number): number {
  const bonus = estimate === actual ? 2 : 0;
  return (actual - Math.abs(estimate - actual) + bonus) * 10;
}

function calcTotalPoints(player: Player): number {
  return player.rounds
    .filter(isFinished)
    .reduce((total, round) => total + round.points, 0);
}

export const {
  setPlayers, //
  setEstimates,
  setActuals,
  restartGame,
} = slice.actions;

export const reducer = slice.reducer;
