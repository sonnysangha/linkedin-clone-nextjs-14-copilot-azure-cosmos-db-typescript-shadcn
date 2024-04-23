"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { DeletePostRequestBody } from "@/app/api/posts/[post_id]/route";
import { Post } from "@/mongodb/models/post";

export default async function deletePostAction(postId: string) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const body: DeletePostRequestBody = {
    userId: user.id,
  };

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userId !== user.id) {
    throw new Error("Post does not belong to the user");
  }

  try {
    await post.removePost();
    revalidatePath("/");
  } catch (error) {
    throw new Error("An error occurred while deleting the post");
  }
}
