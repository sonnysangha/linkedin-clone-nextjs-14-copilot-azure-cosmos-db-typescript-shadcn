import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
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
      <PostForm />
      <PostFeed posts={posts} />
    </main>
  );
}
