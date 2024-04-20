"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import getURL from "@/lib/getUrl";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
  const postInput = formData.get("postInput") as string;

  if (!postInput) {
    throw new Error("Post input is required");
  }

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  const body: AddPostRequestBody = {
    user: userDB,
    text: postInput,
  };

  const response = await fetch(getURL("/api/posts"), {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  revalidateTag("posts");
}
