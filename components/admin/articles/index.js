import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import AllPosts from "../../posts/AllPosts";

const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;

  & > h2 {
    text-align: center;
  }

  & > div {
    width: calc(100vw - 230px);
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
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchPosts();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts/my-posts");
    const data = await res.json();
    setPosts(data);
  };

  const onEditPost = (slug) => {
    router.push(`/admin/articles/edit/${slug}`);
  };
  const onDeletePost = async (postId) => {
    const res = await fetch("/api/posts/delete-post", {
      method: "DELETE",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      await fetchPosts();
    }
  };

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

      <AllPosts
        posts={posts}
        isEdit
        onDeletePost={onDeletePost}
        onEditPost={onEditPost}
      />
    </Wrapper>
  );
}
