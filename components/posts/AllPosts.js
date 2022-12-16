import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";

import PostItem from "./PostItem";
import { SearchContext } from "../contexts/searchContext";

const Title = styled.h1`
  text-align: center;
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 20px;
  justify-content: center;
  align-content: center;
  padding: 0 30px 30px;

  &.editing {
    gap: 30px 40px;
  }
`;

export default function AllPosts({
  posts,
  pageTitle,
  isEdit,
  onDeletePost,
  onEditPost,
}) {
  const [all_posts, setAllPosts] = useState(posts || []);
  const { searchTerm } = useContext(SearchContext);

  const filteredPosts = useMemo(() => {
    return all_posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    });
  }, [searchTerm, all_posts]);

  return (
    <>
      {pageTitle && <Title>{pageTitle}</Title>}

      <PostsContainer className={`${isEdit ? "editing" : ""}`}>
        {filteredPosts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            isEdit={isEdit}
            onDeletePost={onDeletePost}
            onEditPost={onEditPost}
          />
        ))}
      </PostsContainer>
    </>
  );
}
