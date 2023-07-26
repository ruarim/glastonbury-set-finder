"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { options } from "../api/auth/options";

export async function getUser() {
  const session = await getServerSession(options);
  const user = session?.user;
  return user;
}
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
export async function voteForPerformance(
  group_id: number,
  performance_id: number,
  user_id: string
) {
  const vote = await getVote(group_id, performance_id, user_id);

  if (vote) await prisma.vote.delete({ where: { id: vote.id } });

  await prisma.vote.create({
    data: {
      group_id,
      performance_id,
      user_id,
    },
  });

  revalidatePath(`/groups`);
}

export async function removePerformanceVote(id: number) {
  await prisma.vote.delete({ where: { id } });
  revalidatePath(`/groups`);
}

async function getVote(
  group_id: number,
  performance_id: number,
  user_id: string
) {
  const vote = await prisma.vote.findFirst({
    where: {
      group_id,
      performance_id,
      user_id,
    },
  });
  return vote;
}

export async function getVotes(group_id: number, performance_id: number) {
  const votes = await prisma.vote.findMany({
    where: { group_id, performance_id },
  });
  return votes;
}

//add user to group?

//edit group name?
