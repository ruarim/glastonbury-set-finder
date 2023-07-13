"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`rounded-md w-full h-10 px-2 border border-gray-500 text-black ${className}`}
      {...rest}
    />
  );
}
