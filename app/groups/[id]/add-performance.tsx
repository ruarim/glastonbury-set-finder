"use client";

import { useState, useTransition } from "react";
import Button from "../../../components/ui/button";
import PlusIcon from "../../../components/ui/plus-icon";
import SearchInput from "../../../components/ui/performance-search";
import { addPerformanceToGroup, filterPerformanceByName } from "../actions";
import { Performance } from "@prisma/client";

export default function AddPerformanceForm({ groupId }: { groupId: number }) {
  const [isPending, startTransition] = useTransition();
  const [selectedPerformance, setSelectedPerformance] = useState<Performance>({
    id: 0,
    title: "",
    stage: "",
    day: "",
    time: "",
  });

  return (
    <div className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5">
      <SearchInput
        placeholder="Performance name..."
        selected={selectedPerformance}
        setSelected={setSelectedPerformance}
        filter={filterPerformanceByName}
        width="col-span-3"
      />
      <Button
        onClick={() =>
          startTransition(() =>
            addPerformanceToGroup(groupId, selectedPerformance.id)
          )
        }
        className="h-10 col-start-4"
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
