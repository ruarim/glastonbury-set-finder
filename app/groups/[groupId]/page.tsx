import Container from "@/components/container";

export default async function Group({
  params,
}: {
  params: { groupId: string };
}) {
  const { groupId } = params;

  //use prisma to get group info

  return <Container className="p-3">{groupId}</Container>;
}
