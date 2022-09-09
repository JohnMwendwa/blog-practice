import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

const Title = styled.h1`
  text-align: center;
`;

export default function AllPosts({ posts }) {
  return (
    <>
      <Title>All Posts</Title>
      <div>
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
