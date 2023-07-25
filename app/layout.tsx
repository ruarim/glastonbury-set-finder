import Footer from "./footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

export const title = "Glasto-Finder";
export const description =
  "Receive personalised Glastonbury performance recommendations based on your Spotify liked tracks.";
const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const image = `${url}/glasto-finder-logo.png`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Glasto Finder",
      },
    ],
  },
};

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
          className={`${inter.className} grid grid-cols-1 h-screen place-items-center px-3`}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
