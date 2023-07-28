"use client";

import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Plus from "../../../components/ui/icons/plus";
import { createGroup } from "../actions";

interface Props {
  userId: string;
}

export default function CreateGroupForm({ userId }: Props) {
  return (
    <form
      action={(formData) => createGroup(userId, formData)}
      className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5 items-center"
    >
      <Input name={"title"} placeholder="Name" className="col-span-3 h-8" />
      <Button type="submit" className="h-8">
        <Plus />
      </Button>
    </form>
  );
}
