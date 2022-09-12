import Head from "next/head";
import { getFeaturedPosts } from "../helpers/posts_utils";
import FeaturedPosts from "../components/homepage/FeaturedPosts";

export default function Home({ posts }) {
  if (!posts.length)
    return (
      <>
        <Head>
          <title>John Mwendwa blog post</title>
          <meta
            name="description"
            content="I post about web development and best programming practices "
          />
        </Head>
      </>
    );

  return (
    <>
      <Head>
        <title>John Mwendwa blog post</title>
        <meta
          name="description"
          content="I post about web development and best programming practices "
        />
      </Head>
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps = () => {
  const posts = getFeaturedPosts();
  return {
    props: {
      posts,
    },
  };
};
