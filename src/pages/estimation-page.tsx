import React from "react";
import { useAppSelector } from "../model";

export const EstimationPage: React.FC = () => {
  const player = useAppSelector((root) => root.player);
  return (
    <div>
      <h1>EstimationPage</h1>
      <ol>
        {player.map((p) => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ol>
    </div>
  );
};
