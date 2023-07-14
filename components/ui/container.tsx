import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`border border-gray-500 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Container;
