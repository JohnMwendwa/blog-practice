import Head from "next/head";
import { getFeaturedPosts } from "../helpers/posts_utils";
import FeaturedPosts from "../components/homepage/FeaturedPosts";

export default function Home({ posts }) {
  if (!posts.length)
    return (
      <>
        <Head>
          <title>John Mwendwa Blog - A blog for curious developers</title>
          <meta
            name="description"
            content="Find articles about javascript,reactjs,nextjs,nodejs,mongodb and more..."
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
          content="Find articles about javascript,reactjs,nextjs,nodejs,mongodb and more..."
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
