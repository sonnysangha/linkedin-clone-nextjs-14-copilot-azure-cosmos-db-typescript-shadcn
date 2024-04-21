"use server";

import { AddCommentRequestBody } from "@/app/api/posts/[post_id]/comments/route";
import getURL from "@/lib/getUrl";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export default async function createCommentAction(
  postId: string,
  formData: FormData
) {
  const user = await currentUser();

  const commentInput = formData.get("commentInput") as string;

  if (!postId) throw new Error("Post id is required");
  if (!commentInput) throw new Error("Comment input is required");
  if (!user?.id) throw new Error("User not authenticated");

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  const body: AddCommentRequestBody = {
    user: userDB,
    text: commentInput,
  };

  const response = await fetch(getURL(`/api/posts/${postId}/comments`), {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  revalidateTag("posts");
}
