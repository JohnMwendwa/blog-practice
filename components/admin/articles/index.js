import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import AllPosts from "../../posts/AllPosts";

const Wrapper = styled.div`
  margin: 0 auto;

  & div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex: 1;
  }
`;

export const Btn = styled.button`
  display: block;
  margin: 0 auto 20px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: ${(c) => c.theme.colors.ui.secondary};
  color: white;
  outline: 1px solid ${(c) => c.theme.colors.ui.secondary};
  font-size: 1.25rem;

  & span {
    font-weight: bold;
    padding: 3px;
  }
`;

export default function Articles() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fethPosts();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const fethPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };
  console.log(posts);
  return (
    <Wrapper>
      <h2>My Articles</h2>
      <Link href="/admin/articles/new">
        <a>
          <Btn>
            <span>+</span> Create New
          </Btn>
        </a>
      </Link>

      <AllPosts posts={posts} />
    </Wrapper>
  );
}
