import connectDB from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  image?: string | null;
}

export async function POST(request: Request) {
  const { user, text, image }: AddPostRequestBody = await request.json();

  try {
    await connectDB();

    const postData: IPostBase = {
      user,
      text,
      ...(image && { imageUrl: image }),
    };

    const post = await Post.create(postData);
    return NextResponse.json({ message: "Post created successfully", post });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while creating the post ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.getAllPosts();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}
