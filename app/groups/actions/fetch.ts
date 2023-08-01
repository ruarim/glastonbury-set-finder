"use server";

import { getServerSession } from "next-auth";
import { Performance } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { options } from "@/app/api/auth/options";

export async function getUser() {
  const session = await getServerSession(options);
  const user = session?.user;
  return user;
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

export async function getVote(
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
  const group = prisma.group.findUnique({
    where: { id },
    include: { performances: true },
  });
  return group;
}

export async function getGroups(creator_id: string) {
  const groups = prisma.group.findMany({
    where: { creator_id },
  });
  return groups;
}

type PerformanceWithVotesCount = Performance & { votesCount: number };

async function getPerformancesWithVotes(performances: Performance[]) {
  const performanceIds = performances.map(
    (performance: Performance) => performance.id
  );

  const performanceVotes = await prisma.vote.groupBy({
    by: ["performance_id", "group_id"],
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
