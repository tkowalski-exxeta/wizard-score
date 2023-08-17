import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/button";
import {
  restartGame,
  setEstimates,
  useAppDispatch,
  useAppSelector,
} from "../model";

export const EstimationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((root) => root);

  const resolver = useMemo(() => {
    const schema = z.array(z.number().min(0).max(state.currentRound));
    return zodResolver(schema);
  }, [state.currentRound]);

  const { handleSubmit, register } = useForm({
    mode: "onChange",
    defaultValues: state.player.map((_, i) => i),
    resolver,
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">
        Round {state.currentRound} of {state.totalRounds}
      </h1>
      <Button onClick={() => dispatch(restartGame())}>Reset Game</Button>
      <form
        onSubmit={handleSubmit(
          (vals) => {
            console.log("SUBMIT:", vals);
            const estimates = Object.fromEntries(
              state.player.map((p, i) => [p._id, vals[i] ?? 0])
            );
            dispatch(setEstimates(estimates));
          },
          (err) => {
            console.log("invalid:", err);
          }
        )}
      >
        <table className="text-xl mb-2">
          {state.player.map((p, i) => (
            <tr key={p._id}>
              <td className="p-2">{p.name}</td>
              <td>
                <input
                  type="number"
                  className="text-slate-950"
                  {...register(`${i}` as const)}
                />
              </td>
            </tr>
          ))}
        </table>
        <div>
          <Button type="submit">Start Round {state.currentRound}</Button>
        </div>
      </form>
    </div>
  );
};
