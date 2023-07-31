import { getUser, getVotes } from "../actions/fetch";
import { CastVote, RemoveVote } from "./voting";
import { Vote } from "@prisma/client";

export interface VotesProps {
  groupId: number;
  performanceId: number;
}

export default async function Votes({ groupId, performanceId }: VotesProps) {
  const user = await getUser();
  const votes = await getVotes(groupId, performanceId);
  const email = user?.email as string;
  const userVote = votes?.find((vote) => vote.user_id === email);

  return (
    <div className="md:flex justify-center items-center">
      <DisplayVotes votes={votes} />
      {userVote ? (
        <RemoveVote voteId={userVote.id} groupId={groupId} />
      ) : (
        <CastVote
          groupId={groupId}
          performanceId={performanceId}
          userId={email}
        />
      )}
    </div>
  );
}

function DisplayVotes({ votes }: { votes: Vote[] }) {
  return (
    <div className="p-2">
      <div className="text-sm text-gray-400">
        <div>{votes.length}</div>
        <div>Votes</div>
      </div>
    </div>
  );
}
