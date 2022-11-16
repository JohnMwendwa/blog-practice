import { createContext, useState, useMemo, useContext, useEffect } from "react";

const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export function PostProvider({ children, post }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let post_id = post._id;

  useEffect(() => {
    if (post_id !== "") {
      fetchComments(post_id);
    }
  }, [post_id]);

  // Clear error state after 5 seconds
  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const fetchComments = async (id) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }

    setComments(data);
  };

  const onCreateComment = async (message, parentId, postId = post._id) => {
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
      await fetchComments(post_id);
      setLoading(false);
    }
  };

  const onUpdateComment = async (message, commentId) => {
    setLoading(true);

    const res = await fetch("/api/comments/update-comment", {
      method: "PATCH",
      body: JSON.stringify({ message, commentId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    }

    if (res.ok) {
      await fetchComments(post_id);
      setLoading(false);
    }

    setLoading(false);
  };

  const onDeleteComment = async (commentId) => {
    setLoading(true);

    const res = await fetch("/api/comments/delete-comment", {
      method: "DELETE",
      body: JSON.stringify({ commentId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    }

    if (res.ok) {
      await fetchComments(post_id);
      setLoading(false);
    }

    setLoading(false);
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
        onCreateComment,
        onUpdateComment,
        onDeleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
