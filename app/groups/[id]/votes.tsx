import { getUser, getVotes } from "../actions";
import { CastVote, RemoveVote } from "./voting";
import { Vote } from "@prisma/client";

export interface VotesProps {
  groupId: number;
  performanceId: number;
}


export default async function Votes({ groupId, performanceId }: VotesProps) {
  const user = await getUser();
  const votes = await getVotes(groupId, performanceId);

  const userVoted = () => {
    return votes?.some((vote) => vote.user_id === user?.email);
  };

  return (
    <div>
      {userVoted() && user?.email ? (
        <DisplayVotes votes={votes} user={user.email} />
      ) : (
        user?.email && (
          <CastVote
            groupId={groupId}
            performanceId={performanceId}
            user_id={user?.email}
          />
        )
      )}
    </div>
  );
}

function DisplayVotes({ votes, user }: { votes: Vote[]; user: string }) {
  const userVote = votes?.find((vote) => vote.user_id === user);

  return (
    <div>
      {votes?.length > 0 ? (
        <div className="p-2 flex space-x-2 items-center">
          <div className="text-sm text-gray-400 flex">{votes.length} Votes</div>
          {userVote && <RemoveVote voteId={userVote.id} />}
        </div>
      ) : (
        <div>No Votes</div>
      )}
    </div>
  );
}
