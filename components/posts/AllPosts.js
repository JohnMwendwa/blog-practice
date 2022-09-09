import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

const Title = styled.h1`
  text-align: center;
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  row-gap: 0px;
  column-gap: 1.2rem;
  justify-items: center;
  align-content: center;
`;

export default function AllPosts({ posts }) {
  return (
    <>
      <Title>All Posts</Title>
      <PostsContainer>
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </PostsContainer>
    </>
  );
}
