import Footer from "./footer";
import "./globals.css";
import { Metadata } from "next";
import CenteredLayout from "@/components/layouts/centered";
import { image, title, description, url } from "./metadata";

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
        alt: title,
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
