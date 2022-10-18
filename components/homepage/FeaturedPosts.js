import React, { useContext, useMemo } from "react";
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

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    });
  }, [searchTerm, posts]);

  return (
    <>
      <Title>Featured Posts</Title>
      <PostsContainer>
        {filteredPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </PostsContainer>
    </>
  );
}
