import Container from "@/components/ui/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import AddPerformance from "./add-performance";
import Votes from "./votes";

export default async function Group({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const group = await getGroup(id);
  const performances = group?.performances || [];

  return (
    <Container className="p-3 w-full md:w-[600px] space-y-2">
      <div className="grid grid-cols-5">
        <h1 className="flex items-center col-span-2 md:col-span-3 text-3xl font-semibold">
          {group?.title}
        </h1>
        <AddPerformance groupId={id} />
      </div>

      <div className="max-h-96 overflow-y-auto w-full">
        {performances.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-center">Vote</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performances.map((performance) => (
                <TableRow key={performance.id}>
                  <TableCell className="font-medium">
                    {performance.title}
                  </TableCell>
                  <TableCell>{performance.stage}</TableCell>
                  <TableCell>{performance.time}</TableCell>
                  <TableCell className="text-center">
                    {/* @ts-expect-error Async Server Component */}
                    <Votes performanceId={performance.id} groupId={id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-gray-400 text-center">No performances added</div>
        )}
      </div>
    </Container>
  );
}

const getGroup = async (id: number) => {
  return prisma.group.findUnique({
    where: { id },
    include: { performances: true },
  });
};
