import { forwardRef, useState, type ForwardedRef, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: FieldError;
}

export const InputPassword = forwardRef(({ label, id, error, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [visible, setVisible] = useState(false);

  const handleEyeClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center gap-4">
        <label htmlFor={id} className="w-24 text-blue-700 font-semibold">
          {label}
        </label>
        <div className="pr-1.5 flex items-center justify-between border-2 rounded-lg bg-gray-300 w-full h-8 border-blue-500  focus-visible:border-blue-700 outline-hidden">
          <input ref={ref} id={id} className="  outline-hidden w-10/12" type={visible ? "text" : "password"} {...rest} />
          {visible ? <FaEye onClick={handleEyeClick} /> : <FaEyeSlash onClick={handleEyeClick} />}
        </div>
      </div>
      {error ? <p className="text-xs text-red-500 h-2">{error.message}</p> : <p className="h-2"></p>}
    </div>
  );
});
