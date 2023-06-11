import Footer from "./footer";
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
      <body>
        <div
          className={`${inter.className} grid grid-cols-1  h-screen place-items-center px-3`}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
