import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/button";
import { setPlayers, useAppDispatch } from "../model";

const schema = z.object({
  player: z
    .array(
      z.object({
        name: z.string().min(2).max(20),
      })
    )
    .min(2)
    .max(6),
});
const resolver = zodResolver(schema);

type PlayerInputs = z.infer<typeof schema>;

export const PlayerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, register } = useForm({
    mode: "onChange",
    defaultValues: {
      player: [{ name: "" }, { name: "" }],
    } satisfies PlayerInputs,
    resolver,
  });
  const { fields, append } = useFieldArray({ control, name: "player" });

  return (
    <div className="p-4">
      <h1 className="text-center text-5xl font-bold">Wizard Scorecard</h1>
      <p className="text-xl">Please enter players:</p>

      <form
        onSubmit={handleSubmit((vals) => {
          console.log("SUBMIT:", vals);
          dispatch(setPlayers(vals.player));
        })}
      >
        <ol>
          {fields.map((field, index) => (
            <li key={field.id} className="p-2">
              <input
                className="p-2 w-full bg-slate-100 text-slate-950"
                {...register(`player.${index}.name` as const)}
              />
            </li>
          ))}
        </ol>
        <Button
          label="Add Player"
          onClick={(ev) => {
            ev.stopPropagation();
            append({ name: "" });
          }}
        />

        <button
          type="submit"
          className="py-2 px-4 w-full bg-slate-500 rounded shadow-slate-500"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};
