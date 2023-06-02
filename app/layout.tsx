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
        className={`${inter.className} grid grid-cols-1  h-screen place-items-center px-4`}
      >
        {children}
      </body>
    </html>
  );
}
