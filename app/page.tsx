import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";

export default async function Home() {
  return (
    <main className="">
      <PostForm />
      <PostFeed />
    </main>
  );
}
