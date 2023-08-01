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
import EditGroupTitleForm from "../forms/edit-title";
import ShareGroup from "./share";
import { getGroup, getPerformancesSortedDesc } from "../queries/fetch";
import { Performance } from "@prisma/client";

export default async function Group({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const group = await getGroup(id);

  if (!group)
    return <Container className="text-lg p-3">Group not found</Container>;

  const performances = await getPerformancesSortedDesc(id);

  return (
    <Container className="p-3 w-full md:w-[600px] space-y-3 mb-14 mt-2">
      <div className="md:grid grid-cols-5 space-y-2 md:space-y-1">
        <h1 className="flex items-center col-span-2 md:col-span-3 font-semibold gap-1">
          <EditGroupTitleForm groupId={id} title={group?.title} />
        </h1>
        <AddPerformance groupId={id} />
      </div>

      <div className="border border-gray-600 rounded-lg">
        {performances.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Artist</TableHead>
                <TableHead>Stage/Time</TableHead>
                <TableHead className="flex justify-center md:justify-end items-center">
                  <div className="md:w-16 md:flex justify-center">Vote</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performances.map((performance) => (
                <PerformanceRow
                  performance={performance}
                  groupId={id}
                  key={performance.id}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-gray-400 text-center py-5">
            No performances added
          </div>
        )}
      </div>
      <ShareGroup groupId={id} />
    </Container>
  );
}

const PerformanceRow = ({
  performance,
  groupId,
}: {
  performance: Performance;
  groupId: number;
}) => {
  return (
    <TableRow key={performance.id}>
      <TableCell className="font-medium">{performance.title}</TableCell>
      <TableCell>
        <>{performance.stage}</>
        <br></br>
        <>{performance.time}</>
      </TableCell>
      <TableCell className="text-center">
        <Votes performanceId={performance.id} groupId={groupId} />
      </TableCell>
    </TableRow>
  );
};
