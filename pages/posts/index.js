import Head from "next/head";
import { getAllPosts } from "../../helpers/posts_utils";
import AllPosts from "../../components/posts/AllPosts";
import { SearchContextProvider } from "../../components/contexts/searchContext";

export default function AllBlogPosts({ posts }) {
  const postTitles = posts.map((post) => ` ${post.title.toLowerCase()}`);

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
        <meta name="description" content={postTitles} />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, Reactjs, Nextjs, React Native, react"
        ></meta>
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
