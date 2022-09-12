import Head from "next/head";
import { getAllPosts } from "../../helpers/posts_utils";
import AllPosts from "../../components/posts/AllPosts";

export default function AllBlogPosts({ posts }) {
  if (!posts.length)
    return (
      <>
        <Head>
          <title>All Posts</title>
          <meta
            name="description"
            content="list of all programming related tutorials"
          />
        </Head>
      </>
    );

  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="list of all programming related tutorials"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export const getStaticProps = () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
