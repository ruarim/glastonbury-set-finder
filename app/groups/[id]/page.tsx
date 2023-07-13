import Container from "@/components/container";

export default async function Group({ params }: { params: { id: string } }) {
  const { id } = params;

  //use prisma to get group info

  return <Container className="p-3">{id}</Container>;
}
