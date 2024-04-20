"use client";

// import PostOptions from "./PostOptions";
// import CommentFeed from "./CommentFeed";
import { EllipsisIcon, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";

function Post({ post }: { post: IPostDocument }) {
  return (
    <div className="p-4 bg-white rounded-md border max-w-xl mx-auto">
      <div className="flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post.user.userImage} />
            <AvatarFallback>
              {post.user.firstName?.charAt(0)}
              {post.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semibold">
              {post.user.firstName} {post.user.lastName}
            </p>
            <p className="text-xs">0 followers</p>
          </div>

          <div className="space-x-2">
            <button>
              <EllipsisIcon />
            </button>

            <button>
              <XIcon />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="mt-2">{post.text}</p>

        {/* If image uploaded put it here... */}
      </div>

      {/* <PostOptions postId={_id.toString()} /> */}
    </div>
  );
}

export default Post;
