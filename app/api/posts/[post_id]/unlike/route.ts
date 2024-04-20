import { Post } from "@/mongodb/models/post";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  const { userId } = await request.json();
  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.unlikePost(userId);
    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while unliking the post" },
      { status: 500 }
    );
  }
}
