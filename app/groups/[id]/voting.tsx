"use client";

import { VotesProps } from "./votes";
import { useTransition } from "react";
import Check from "@/components/ui/icons/check";
import Cross from "@/components/ui/icons/cross";
import { removePerformanceVote, voteForPerformance } from "../queries/mutation";

interface CastVoteProps extends VotesProps {
  userId: string;
}

export function CastVote({ groupId, performanceId, userId }: CastVoteProps) {
  const [isPending, startTransition] = useTransition();
  const handleVote = async () => {
    startTransition(() => voteForPerformance(groupId, performanceId, userId));
  };

  return (
    <button onClick={handleVote}>
      <Check className="hover:text-green-300" />
    </button>
  );
}

export function RemoveVote({
  voteId,
  groupId,
}: {
  voteId: number;
  groupId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const handleRemoveVote = () => {
    startTransition(() => removePerformanceVote(voteId, groupId));
  };

  return (
    <button onClick={handleRemoveVote}>
      <Cross className="hover:text-red-400" />
    </button>
  );
}
