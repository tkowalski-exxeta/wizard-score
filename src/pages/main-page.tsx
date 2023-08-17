import React from "react";
import { useAppSelector } from "../model/root-state";
import { ActualPage } from "./actual-page";
import { EstimationPage } from "./estimation-page";
import { LeaderBoard } from "./leaderboard-page";
import { PlayerPage } from "./player-page";

interface MainPageProps {}

export const MainPage: React.FC<MainPageProps> = () => {
  const phase = useAppSelector((rootState) => rootState.phase);

  switch (phase) {
    case "enter-players":
      return <PlayerPage />;
    case "enter-estimate":
      return <EstimationPage />;
    case "enter-actual":
      return <ActualPage />;
    case "game-over":
      return <LeaderBoard />;
  }
  phase satisfies never; // Ensures all phase-types are covered
};
