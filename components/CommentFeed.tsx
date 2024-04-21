"use client";

import { IPostDocument } from "@/mongodb/models/post";

function CommentFeed({ post }: { post: IPostDocument }) {
  return (
    <div>
      {post?.comments?.map((comment) => (
        <div key={comment._id}>
          <p>
            {comment.user.firstName}: {comment.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CommentFeed;
