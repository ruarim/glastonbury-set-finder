"use client";

import Button from "@/components/button";
import { createGroup } from "./actions";
import Input from "@/components/input";

export default function GroupsTableHeader({ userId }: { userId: string }) {
  return (
    <div className="grid grid-cols-5">
      <h1 className="flex items-center col-span-2 md:col-span-3 text-3xl font-semibold">
        Groups
      </h1>
      <form
        action={(formData) => createGroup(userId, formData)}
        className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5"
      >
        <Input name={"title"} className="col-span-3" />
        <Button type="submit" className="h-10">
          <PlusIcon />
        </Button>
      </form>
    </div>
  );
}

const PlusIcon = () => (
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
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
