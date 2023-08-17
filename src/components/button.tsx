import React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { variant: "primary" | "outline" };

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, onClick, ...otherProps }, ref) => {
    const cls =
      variant === "outline"
        ? "py-2 px-4 w-full mb-2 border-slate-500 border-1 rounded shadow-slate-500"
        : "py-2 px-4 w-full mb-2 bg-slate-500 rounded shadow-slate-500";

    return (
      <button
        ref={ref}
        className={cls}
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          onClick?.(ev);
        }}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);
