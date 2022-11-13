import { createContext, useState, useMemo, useContext } from "react";

const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export function PostProvider({ children }) {
  const [comments, setComments] = useState(null);

  const commentByParentId = useMemo(() => {
    if (comments === null) return [];
    const group = {};

    comments.forEach((comment) => {
      group[comment.parentId] || [];
      group[comment.parentId].push(comment);
    });

    return group;
  }, [comments]);

  function getReplies(parentId) {
    return commentByParentId[parentId];
  }

  return (
    <PostContext.Provider
      value={{ rootComments: commentByParentId[null], getReplies }}
    >
      {children}
    </PostContext.Provider>
  );
}
