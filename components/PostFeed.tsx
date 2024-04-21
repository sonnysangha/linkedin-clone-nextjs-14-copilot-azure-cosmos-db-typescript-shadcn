import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";
import getURL from "@/lib/getUrl";

async function PostFeed() {
  const response = await fetch(getURL("/api/posts"), {
    next: {
      revalidate: 0,
      tags: ["posts"],
    },
  });
  const posts: IPostDocument[] = await response.json();

  return (
    <div className="space-y-2 mt-2 pb-20">
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
