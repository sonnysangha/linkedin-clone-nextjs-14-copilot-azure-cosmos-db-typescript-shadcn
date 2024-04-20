import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";

function PostFeed({ posts }: { posts: IPostDocument[] }) {
  return (
    <div className="space-y-2 mt-2">
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
