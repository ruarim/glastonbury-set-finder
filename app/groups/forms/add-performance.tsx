"use client";

import Button from "../../../components/ui/button";
import PlusIcon from "../../../components/ui/plus-icon";
import SearchInput from "../../../components/ui/search-input";

export default function AddPerformanceForm() {
  //save which user added the performance?
  
  return (
    <form
      //action={(formData) => addPerformance(userId, formData)}
      className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5"
    >
      <SearchInput />
      <Button type="submit" className="h-10">
        <PlusIcon />
      </Button>
    </form>
  );
}
