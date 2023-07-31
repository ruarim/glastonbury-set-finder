import { ReactNode } from "react";

export default function CenteredLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`grid grid-cols-1 h-screen place-items-center px-3 w-full`}
    >
      {children}
    </div>
  );
}
