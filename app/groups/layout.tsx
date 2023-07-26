import Login from "@/components/auth/login";
import CenteredLayout from "@/components/layouts/centered";
import { getUser } from "./actions";

export default async function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUser();

  if (!session) return <Login />;

  return <CenteredLayout>{children}</CenteredLayout>;
}
