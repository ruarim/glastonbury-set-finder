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

export async function addPerformanceToGroup(
  groupId: number,
  performanceId: number
) {
  await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      performances: {
        connect: {
          id: performanceId,
        },
      },
    },
  });

  revalidatePath(`/groups`);
}

export async function filterPerformanceByName(query: string) {
  const perfomances = await prisma.performance.findMany({
    where: {
      title: {
        contains: query,
      },
    },
  });

  return perfomances;
}

//add vote to perfomance in group
//return ordered of perfomances in group from most to least voted for

//add user to group?

//edit group name?
