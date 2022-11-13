import { createContext, useState, useMemo } from "react";

const PostContext = createContext();

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

  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
}
