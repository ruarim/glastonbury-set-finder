import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} grid grid-cols-1 justify-items-center h-screen items-center`}
      >
        {children}
      </body>
    </html>
  );
}
