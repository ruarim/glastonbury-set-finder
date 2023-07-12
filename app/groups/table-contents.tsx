import { Group } from "@prisma/client";
import Link from "next/link";

export default function GroupsTableContents({ groups }: { groups: Group[] }) {
  if (groups.length == 0)
    return <div className="text-gray-400 text-center">No groups created</div>;

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <GroupRow group={group} />
      ))}
    </div>
  );
}

const GroupRow = ({ group }: { group: Group }) => {
  return (
    <div className="grid grid-cols-5 h-12">
      <div className="col-span-1 flex items-center text-center">
        {group.title}
      </div>
      <div className="col-span-2 flex items-center text-center">
        {group.created_at.toDateString()}
      </div>
      <div className="col-start-5 flex justify-end">
        <Link
          href={`/groups/${group.id}`}
          className="border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-3 text-lg text-gray-200 transition-colors duration-300 ease-in-out text-center flex items-center"
        >
          <Arrow />
        </Link>
      </div>
    </div>
  );
};

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);
