import type { ButtonHTMLAttributes } from "react";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export function MyButton({ name, ...rest }: buttonProps) {
  return (
    <button className="bg-blue-500 rounded-lg w-full h-8 text-zinc-300" {...rest}>
      {name}
    </button>
  );
}
