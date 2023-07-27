"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { options } from "../api/auth/options";
import { Performance } from "@prisma/client";

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

export async function getGroup(id: number) {
  return prisma.group.findUnique({
    where: { id },
    include: { performances: true },
  });
}

type PerformanceWithVotesCount = Performance & { votesCount: number };

export async function getPerformancesSortedDesc(id: number) {
  const group = await getGroup(id);

  if (!group || !group.performances) return [];

  const performanceIds = group.performances.map(
    (performance: Performance) => performance.id
  );

  const performanceVotes = await prisma.vote.groupBy({
    by: ["performance_id"],
    _count: true,
    where: {
      performance_id: { in: performanceIds },
    },
  });

  const performanceVotesMap: Record<number, number> = {};
  performanceVotes.forEach((voteCount) => {
    performanceVotesMap[voteCount.performance_id] = voteCount._count;
  });

  const performancesWithVotes: PerformanceWithVotesCount[] =
    group.performances.map((performance) => {
      const performanceWithVotes: PerformanceWithVotesCount = {
        ...performance,
        votesCount: performanceVotesMap[performance.id] || 0,
      };
      return performanceWithVotes;
    });

  performancesWithVotes.sort(
    (a: PerformanceWithVotesCount, b: PerformanceWithVotesCount) => {
      return b.votesCount - a.votesCount;
    }
  );

  return performancesWithVotes;
}

//add user to group?

//edit group name?
