import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import PostItem from "./PostItem";
import { SearchContext } from "../contexts/searchContext";

const Title = styled.h1`
  text-align: center;
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  align-content: center;
  padding: 0 30px 30px;
`;

export default function AllPosts({ posts, pageTitle }) {
  const { searchTerm } = useContext(SearchContext);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    });
  }, [searchTerm, posts]);

  return (
    <>
      {pageTitle && <Title>{pageTitle}</Title>}

      <PostsContainer>
        {filteredPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </PostsContainer>
    </>
  );
}
