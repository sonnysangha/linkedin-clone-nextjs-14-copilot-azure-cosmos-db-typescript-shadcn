import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/Widget";
import getURL from "@/lib/getUrl";
import { cn } from "@/lib/utils";
import { IPostDocument } from "@/mongodb/models/post";
import { auth } from "@clerk/nextjs/server";
import { LinkedInEmbed } from "react-social-media-embed";

export default async function Home() {
  const { userId } = auth();

  const response = await fetch(getURL("/api/posts"), {
    next: {
      revalidate: 0,
      tags: ["posts"],
    },
  });

  const posts: IPostDocument[] = await response.json();

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation posts={posts} />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto">
        {userId && <PostForm />}
        <PostFeed posts={posts} />
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        <Widget />
      </section>
    </div>
  );
}
