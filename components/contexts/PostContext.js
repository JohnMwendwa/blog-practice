import { createContext, useState, useMemo, useContext, useEffect } from "react";

const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export function PostProvider({ children, post }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, [comments]);

  const onSendComment = async (message, parentId, postId = post._id) => {
    setLoading(true);

    const response = await fetch("/api/comments/new-comment", {
      method: "POST",
      body: JSON.stringify({ postId, message, parentId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
    }

    if (response.ok) {
      setComments((prev) => [...prev, data]);
      setLoading(false);
    }
  };

  const commentByParentId = useMemo(() => {
    const group = {};

    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });

    return group;
  }, [comments]);

  function getReplies(parentId) {
    return commentByParentId[parentId];
  }

  return (
    <PostContext.Provider
      value={{
        rootComments: commentByParentId[null],
        getReplies,
        error,
        loading,
        onSendComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
