import Head from "next/head";
import AllPosts from "../components/posts/AllPosts";
import { getPosts } from "../helpers/posts_utils";

export default function HomePage({ posts }) {
  if (!posts.length)
    return (
      <>
        <Head>
          <title>John Mwendwa Blog - A blog for curious developers</title>
          <meta
            name="description"
            content="Find articles about javascript, reactjs, nextjs, nodejs, mongodb and more..."
          />
        </Head>
      </>
    );

  return (
    <>
      <Head>
        <title>John Mwendwa Blog - A blog for curious developers</title>
        <meta
          name="description"
          content="Find articles about javascript, reactjs, nextjs, nodejs, mongodb and more..."
        />
      </Head>

      <AllPosts posts={posts} pageTitle="All Posts" />
    </>
  );
}

export const getStaticProps = async () => {
  const postData = await getPosts();
  const posts = JSON.parse(postData);
  return {
    props: {
      posts,
    },
  };
};
