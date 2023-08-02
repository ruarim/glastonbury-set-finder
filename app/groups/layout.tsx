import Login from "@/components/auth/login";
import CenteredLayout from "@/components/layouts/centered";
import { Metadata } from "next";
import { getUser } from "./requests/queries";

export const metadata: Metadata = {
  title: "Glasto-Finder - Groups",
};

export default async function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUser();

  if (!session) return <Login />;

  return <div className="w-full md:w-[600px]">{children}</div>;
}
