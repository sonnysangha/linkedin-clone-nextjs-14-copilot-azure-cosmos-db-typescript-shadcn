import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();

  return (
    <main className="mt-5">
      {userId && <PostForm />}
      <PostFeed />
    </main>
  );
}
