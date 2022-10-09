import React from "react";
import styled from "styled-components";
import PostItem from "../posts/PostItem";

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
  return (
    <>
      <Title>Featured Posts</Title>
      <PostsContainer>
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </PostsContainer>
    </>
  );
}
