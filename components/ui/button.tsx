import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: () => void | Promise<any>;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border bg-black hover:border-gray-400 hover:text-gray-400 text-gray-100 flex w-full justify-center items-center rounded-full p-3 text-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:animate-pulse disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
