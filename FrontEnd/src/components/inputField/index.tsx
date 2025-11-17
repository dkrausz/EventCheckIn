import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: FieldError;
}

export const InputField = forwardRef(({ label, id, error, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center gap-4">
        <label htmlFor={id} className="w-24 text-blue-700 font-semibold">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className="border-2 rounded-lg bg-gray-300 w-full h-8 border-blue-500 outline-hidden focus-visible:border-blue-700"
          {...rest}
        />
      </div>
      {error ? <p className="text-xs text-red-500 h-2">{error.message}</p> : <p className="h-2"></p>}
    </div>
  );
});
