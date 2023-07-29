"use client";

import Edit from "@/components/ui/icons/edit";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import { useState } from "react";
import { editGroupTitle } from "../actions/mutation";

interface EditGroupTitleFormProps {
  groupId: number;
  title: string;
}

export default function EditGroupTitleForm({
  groupId,
  title,
}: EditGroupTitleFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async (formData: FormData) => {
    await editGroupTitle(groupId, formData);
    setIsEditing(false);
  };

  return isEditing ? (
    <form
      action={handleEdit}
      className="grid grid-cols-4 col-span-3 md:col-span-2 space-x-0.5 items-center mt-1 w-full md:w-2/3"
    >
      <Input
        name={"title"}
        placeholder="Name"
        className="col-span-3 h-8"
        defaultValue={title}
      />
      <Button type="submit" className="h-8 text-sm">
        Save
      </Button>
    </form>
  ) : (
    <button
      className="flex items-center gap-1 text-3xl"
      onClick={() => setIsEditing(true)}
    >
      {title}
      <Edit className="w-6 h-6 hover:text-gray-300 transition-all" />
    </button>
  );
}
