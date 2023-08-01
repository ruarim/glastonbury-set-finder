"use client";

import { useState, useTransition } from "react";
import Button from "../../../components/ui/button";
import Plus from "../../../components/ui/icons/plus";
import PerformanceSearchInput from "../../../components/ui/performance-search";
import { Performance } from "@prisma/client";
import { addPerformanceToGroup } from "../queries/mutation";
import { filterPerformanceByName } from "../queries/fetch";

const DEFAULT_PERFORMANCE = {
  id: 0,
  title: "",
  stage: "",
  day: "",
  time: "",
};

export default function AddPerformance({ groupId }: { groupId: number }) {
  const [isPending, startTransition] = useTransition();
  const [selectedPerformance, setSelectedPerformance] =
    useState<Performance>(DEFAULT_PERFORMANCE);

  const handleAddPerformance = () => {
    startTransition(() =>
      addPerformanceToGroup(groupId, selectedPerformance.id)
    );
    setSelectedPerformance(DEFAULT_PERFORMANCE);
  };

  return (
    <div className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5 items-center">
      <PerformanceSearchInput
        placeholder="Performance name..."
        selected={selectedPerformance}
        setSelected={setSelectedPerformance}
        filter={filterPerformanceByName}
        width="col-span-3"
      />
      <Button onClick={handleAddPerformance} className="h-8 col-start-4">
        <Plus />
      </Button>
    </div>
  );
}
