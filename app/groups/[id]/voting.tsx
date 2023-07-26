"use client";

import { VotesProps } from "./votes";
import { useTransition } from "react";
import { removePerformanceVote, voteForPerformance } from "../actions";
import Check from "@/components/ui/icons/check";
import Cross from "@/components/ui/icons/cross";

interface CastVoteProps extends VotesProps {
  user_id: string;
}

export function CastVote({ groupId, performanceId, user_id }: CastVoteProps) {
  const [isPending, startTransition] = useTransition();

  const handleVote = async () => {
    startTransition(() => voteForPerformance(groupId, performanceId, user_id));
  };

  return (
    <div>
      <button
        className="w-full h-full p-2 flex items-center justify-end hover:text-green-300"
        onClick={handleVote}
      >
        <Check />
      </button>
    </div>
  );
}

export function RemoveVote({ voteId }: { voteId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleRemoveVote = () => {
    startTransition(() => removePerformanceVote(voteId));
  };

  return (
    <div className="h-full">
      <button onClick={handleRemoveVote}>
        <Cross className="hover:text-red-400 justify-end" />
      </button>
    </div>
  );
}
