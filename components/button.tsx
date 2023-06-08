import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="border transition-all hover:border-gray-400 hover:text-gray-400 text-gray-100 flex w-full justify-center rounded-lg p-3 text-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
