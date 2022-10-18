import React, { useContext } from "react";
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

export default function AllPosts({ posts }) {
  const { searchTerm } = useContext(SearchContext);

  return (
    <>
      <Title>All Posts</Title>
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
