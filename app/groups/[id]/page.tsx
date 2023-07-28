import Container from "@/components/ui/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddPerformance from "./add-performance";
import Votes from "./votes";
import { getGroup, getPerformancesSortedDesc } from "../actions";
import EditGroupTitleForm from "../forms/edit-title";

export default async function Group({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const group = await getGroup(id);

  if (!group) return <div className="text-lg">Group not found</div>;

  const performances = await getPerformancesSortedDesc(id);

  return (
    <Container className="p-3 w-full md:w-[600px] space-y-2">
      <div className="md:grid grid-cols-5 space-y-1 ">
        <h1 className="flex items-center col-span-2 md:col-span-3 text-3xl font-semibold gap-1">
          <EditGroupTitleForm groupId={id} title={group?.title} />
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
