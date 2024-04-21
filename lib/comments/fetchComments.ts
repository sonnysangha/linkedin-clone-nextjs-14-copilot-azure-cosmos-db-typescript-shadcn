const fetchComments = async (postId: string) => {
  const response = await fetch(`/api/posts/${postId}/comments`);
  const comments = await response.json();
  return comments;
};

export default fetchComments;
