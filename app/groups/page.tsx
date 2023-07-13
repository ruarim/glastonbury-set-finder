import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/options";
import Login from "@/components/login";
import Container from "@/components/container";
import GroupsTableHeader from "./table-header";
import Separator from "@/components/seperator";
import { getGroups } from "./actions";
import GroupsTableContents from "./table-contents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glasto-Finder - Groups",
};

export default async function Groups() {
  const session = await getServerSession(options);

  if (!session) return <Login />;

  const email = session?.user?.email as string;
  const groups = await getGroups(email);

  return (
    session && (
      <Container className="p-3 w-full md:w-[600px] space-y-3">
        <GroupsTableHeader userId={email} />
        <Separator />
        <GroupsTableContents groups={groups} />
        <Separator />
      </Container>
    )
  );
}
