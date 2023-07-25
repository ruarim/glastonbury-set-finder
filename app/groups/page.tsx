import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { options } from "../api/auth/options";
import Login from "@/components/auth/login";
import Container from "@/components/ui/container";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Arrow from "@/components/ui/arrow";
import CreateGroupForm from "./forms/create-group";

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
      <Container className="p-3 w-full md:w-[600px] space-y-2">
        <div className="grid grid-cols-5">
          <h1 className="flex items-center col-span-2 md:col-span-3 text-3xl font-semibold">
            Groups
          </h1>
          <CreateGroupForm userId={email} />
        </div>
        <div className="max-h-96 overflow-y-auto w-full">
          {groups.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.title}</TableCell>
                    <TableCell>{group.created_at.toDateString()}</TableCell>
                    <TableCell className="text-right flex justify-end">
                      <Link
                        href={`/groups/${group.id}`}
                        className="border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-3 text-lg text-gray-200 transition-colors duration-300 ease-in-out text-center flex items-center"
                      >
                        <Arrow />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-gray-400 text-center">No groups created</div>
          )}
        </div>
      </Container>
    )
  );
}

const getGroups = async (creator_id: string) => {
  return prisma.group.findMany({
    where: { creator_id },
  });
};
