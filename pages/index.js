import Head from "next/head";

import AllPosts from "../components/posts/AllPosts";
import { connectToDatabase, closeConnection } from "../helpers/db/db";
import Post from "../helpers/db/models/post";
import User from "../helpers/db/models/user";

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

export const getServerSideProps = async () => {
  await connectToDatabase();

  const postsData = await Post.find({})
    .select([
      "title",
      "description",
      "author",
      "category",
      "slug",
      "date_uploaded",
      "imgSrc",
    ])
    .populate("author", "firstName lastName", User)
    .sort({ date_uploaded: -1 });

  const postsJSON = JSON.stringify(postsData);
  const posts = JSON.parse(postsJSON);
  await closeConnection();

  return {
    props: {
      posts,
    },
  };
};
