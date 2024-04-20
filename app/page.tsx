import PostFeed from "@/components/PostFeed";
import getURL from "@/lib/getUrl";

export default async function Home() {
  const response = await fetch(getURL("/api/posts"), {
    next: {
      tags: ["posts"],
    },
  });
  const posts = await response.json();

  return (
    <main className="">
      <PostFeed posts={posts} />
    </main>
  );
}
