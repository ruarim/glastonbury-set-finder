"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { options } from "../api/auth/options";
import { Performance } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await getServerSession(options);
  const user = session?.user;
  return user;
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

  revalidatePath(`/groups${group_id}`);
}

export async function removePerformanceVote(id: number, group_id: number) {
  await prisma.vote.delete({ where: { id } });
  revalidatePath(`/groups${group_id}`);
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

async function getPerformancesWithVotes(performances: Performance[]) {
  const performanceIds = performances.map(
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

  const performancesWithVotes: PerformanceWithVotesCount[] = performances.map(
    (performance) => {
      const performanceWithVotes: PerformanceWithVotesCount = {
        ...performance,
        votesCount: performanceVotesMap[performance.id] || 0,
      };
      return performanceWithVotes;
    }
  );

  return performancesWithVotes;
}

export async function getPerformancesSortedDesc(id: number) {
  const group = await getGroup(id);
  const performances = group?.performances;

  if (!performances) return [];

  const performancesWithVotes = await getPerformancesWithVotes(performances);

  performancesWithVotes.sort(
    (a: PerformanceWithVotesCount, b: PerformanceWithVotesCount) => {
      return b.votesCount - a.votesCount;
    }
  );

  return performancesWithVotes;
}

//add user to group?

//edit group name?
