import Footer from "./footer";
import "./globals.css";
import { Metadata } from "next";
import CenteredLayout from "@/components/layouts/centered";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CenteredLayout>{children}</CenteredLayout>
        <Footer />
      </body>
    </html>
  );
}
