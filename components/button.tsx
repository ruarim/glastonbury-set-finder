import { ReactNode } from "react";

const Button = ({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="border transition-all hover:border-gray-400 hover:text-gray-400 text-gray-100 flex w-full justify-center rounded-lg p-3 text-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
