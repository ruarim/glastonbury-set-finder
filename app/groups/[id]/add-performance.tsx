"use client";

import { useState, useTransition } from "react";
import Button from "../../../components/ui/button";
import Plus from "../../../components/ui/icons/plus";
import SearchInput from "../../../components/ui/performance-search";
import { addPerformanceToGroup, filterPerformanceByName } from "../actions";
import { Performance } from "@prisma/client";

export default function AddPerformance({ groupId }: { groupId: number }) {
  const [isPending, startTransition] = useTransition();
  const [selectedPerformance, setSelectedPerformance] = useState<Performance>({
    id: 0,
    title: "",
    stage: "",
    day: "",
    time: "",
  });

  const handleAddPerformance = () => {
    startTransition(() =>
      addPerformanceToGroup(groupId, selectedPerformance.id)
    );
  };

  return (
    <div className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5">
      <SearchInput
        placeholder="Performance name..."
        selected={selectedPerformance}
        setSelected={setSelectedPerformance}
        filter={filterPerformanceByName}
        width="col-span-3"
      />
      <Button onClick={handleAddPerformance} className="h-10 col-start-4">
        <Plus />
      </Button>
    </div>
  );
}
