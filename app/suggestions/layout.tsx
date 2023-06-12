import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glasto-Finder - Suggestions",
};

export default function SuggestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
