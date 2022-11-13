import { createContext } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
}
