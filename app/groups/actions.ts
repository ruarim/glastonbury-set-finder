"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGroup(creator_id: string, formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.group.create({
    data: {
      title,
      creator_id,
    },
  });

  revalidatePath(`/groups`);
}

export async function getGroups(creator_id: string) {
  const groups = await prisma.group.findMany({
    where: { creator_id },
  });

  return groups;
}
