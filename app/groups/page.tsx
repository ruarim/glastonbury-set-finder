import Container from "@/components/ui/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Arrow from "@/components/ui/icons/arrow";
import CreateGroupForm from "./forms/create-group";
import { getGroups, getUser } from "./actions/fetch";

export default async function Groups() {
  const user = await getUser();
  const email = user?.email as string;
  const groups = await getGroups(email);

  return (
    user && (
      <Container className="p-3 w-full md:w-[600px] space-y-3">
        <div className="grid grid-cols-5">
          <h1 className="flex items-center col-span-2 md:col-span-3 text-3xl font-semibold">
            Groups
          </h1>
          <CreateGroupForm userId={email} />
        </div>
        <div className="max-h-96 overflow-y-auto w-full border border-gray-600 rounded-lg">
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
                    <TableCell className="text-right">
                      <div className="flex">
                        <div className="w-2/3" />
                        <Link
                          href={`/groups/${group.id}`}
                          className="border justify-center border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-3 text-lg text-gray-200 transition-colors duration-300 ease-in-out text-center flex items-center"
                        >
                          <Arrow />
                        </Link>
                      </div>
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
