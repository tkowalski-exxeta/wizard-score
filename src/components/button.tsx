import React from "react";

interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="py-2 px-4 w-full mb-2 bg-slate-500 rounded shadow-slate-500"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
