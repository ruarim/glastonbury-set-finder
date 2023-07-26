"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`rounded-lg leading-5 w-full border-none my-1 text-sm pl-3 px-2 border border-white text-black ${className}`}
      {...rest}
    />
  );
}
