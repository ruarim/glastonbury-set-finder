import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`rounded-lg bg-gray-600 border text-white leading-5 w-full border-none text-sm pl-3 px-2 focus:outline-none ${className}`}
      {...rest}
    />
  );
}

export default Input;
