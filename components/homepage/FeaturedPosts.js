import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import PostItem from "../posts/PostItem";
import { SearchContext } from "../contexts/searchContext";

const Title = styled.h1`
  text-align: center;
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 0 30px 30px;
  gap: 20px;
  justify-items: center;
  align-content: center;
`;

export default function FeaturedPosts({ posts }) {
  const { searchTerm } = useContext(SearchContext);

  return (
    <>
      <Title>Featured Posts</Title>
      <PostsContainer>
        {posts
          .filter((val) => {
            return searchTerm.trim().toLowerCase() === ""
              ? val
              : val.title
                  .toLowerCase()
                  .includes(searchTerm.trim().toLowerCase());
          })
          .map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
      </PostsContainer>
    </>
  );
}
