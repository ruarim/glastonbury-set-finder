"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getVote } from "./fetch";

export async function voteForPerformance(
  group_id: number,
  performance_id: number,
  user_id: string
) {
  const vote = await getVote(group_id, performance_id, user_id);
  if (vote) return;

  await prisma.vote.create({
    data: {
      group_id,
      performance_id,
      user_id,
    },
  });

  revalidatePath(`/groups${group_id}`);
}

export async function removePerformanceVote(id: number, group_id: number) {
  await prisma.vote.delete({ where: { id } });
  revalidatePath(`/groups${group_id}`);
}

export async function createGroup(creator_id: string, formData: FormData) {
  const title = formData.get("title") as string;

  const group = await prisma.group.create({
    data: {
      title,
      creator_id,
    },
  });

  redirect(`/groups/${group.id}`);
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

  revalidatePath(`/groups/${groupId}`);
}

export async function editGroupTitle(group_id: number, formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.group.update({
    where: { id: group_id },
    data: { title },
  });

  revalidatePath(`/groups/${group_id}`);
}
