"use server";

import { currentUser } from "@clerk/nextjs/server";
import getURL from "@/lib/getUrl";

import { revalidateTag } from "next/cache";
import { DeletePostRequestBody } from "@/app/api/posts/[post_id]/route";

export default async function deletePostAction(postId: string) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const body: DeletePostRequestBody = {
    userId: user.id,
  };

  const response = await fetch(getURL(`/api/posts/${postId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  revalidateTag("posts");
}
