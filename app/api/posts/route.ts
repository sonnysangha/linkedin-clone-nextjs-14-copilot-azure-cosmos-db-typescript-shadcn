import connectDB from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const postData: IPostBase = {
      user: {
        userId: "a",
        userImage: "b",
        firstName: "c",
        lastName: "d",
      },
      text: "This is a test",
    };

    console.log("DEBUG 2 ADD", postData);

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
