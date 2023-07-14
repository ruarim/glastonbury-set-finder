"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGroup(creator_id: string, formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.group.create({
    data: {
      title,
      creator_id,
    },
  });

  revalidatePath(`/groups`);
}

//add perfomance to group using prismas create perfomance
export default async function addPerformanceToGroup(
  group_id: string,
  formData: FormData
){
  
}

//add vote to perfomance in group
  //return ordered of perfomances in group from most to least voted for

//add user to group?

//edit group name?
