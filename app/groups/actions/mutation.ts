"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getVote } from "./fetch";

export async function createGroup(creator_id: string, formData: FormData) {
  const title = formData.get("title") as string;

  const group = await prisma.group.create({
    data: {
      title,
      creator_id,
    },
  });

  revalidatePath(`/groups`);
  return group;
}

export async function addPerformanceToGroup(
  group_id: number,
  performance_id: number
) {
  const perfomance = await prisma.performance.findUnique({
    where: { id: performance_id },
  });

  if (!perfomance) return;

  await prisma.group.update({
    where: {
      id: group_id,
    },
    data: {
      performances: {
        connect: {
          id: performance_id,
        },
      },
    },
  });

  revalidatePath(`/groups/${group_id}`);
}

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

  revalidatePath(`/groups/${group_id}`);
}

export async function removePerformanceVote(id: number, group_id: number) {
  await prisma.vote.delete({ where: { id } });
  revalidatePath(`/groups/${group_id}`);
}

export async function editGroupTitle(group_id: number, formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.group.update({
    where: { id: group_id },
    data: { title },
  });

  revalidatePath(`/groups/${group_id}`);
}
