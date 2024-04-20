"use client";

import createPostAction from "@/actions/createPostAction";
import { useRef } from "react";

function PostForm() {
  const ref = useRef<HTMLFormElement>(null);

  const handlePostAction = async (formData: FormData): Promise<void> => {
    const formDataCopy = formData;
    ref.current?.reset();

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.error(`Error creating post: ${error}`);

      // Display toast
    }
  };

  return (
    <form ref={ref} className="" action={handlePostAction}>
      {/* userProfile Avatar */}

      <input
        type="text"
        name="postInput"
        placeholder="Start a post, try writing with AI"
      />

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
