import React from "react";
import Head from "next/head";

import { connectToDatabase, closeConnection } from "../helpers/db/db";
import Post from "../helpers/db/models/post";
import User from "../helpers/db/models/user";
import Comment from "../helpers/db/models/comment";
import PostDetails from "../components/posts/PostDetails";
// import { PostProvider } from "../components/contexts/PostContext";

export default function PostDetailsPage({ post, comments }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta
          name="author"
          content={`${post.author.firstName} ${post.author.lastName}`}
        ></meta>
      </Head>

      {/* <PostProvider> */}
      <PostDetails post={post} comments={comments} />
      {/* </PostProvider> */}
    </>
  );
}

export async function getStaticPaths() {
  await connectToDatabase();

  const slugsData = await Post.find().select(["-_id", "slug"]);
  const slugsJSON = JSON.stringify(slugsData);
  const slugs = JSON.parse(slugsJSON);

  await closeConnection();

  return {
    paths: slugs.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  await connectToDatabase();

  const postData = await Post.findOne({ slug })
    .select([
      "title",
      "description",
      "author",
      "category",
      "markdown",
      "date_uploaded",
      "slug",
      "imgSrc",
    ])
    .populate("author", "firstName lastName", User);

  if (!postData) {
    await closeConnection();
    return {
      redirect: {
        destination: "404",
        permanent: false,
      },
    };
  }

  const id = await postData._id.toString();
  const commentsData = await Comment.find({ postId: id });
  const dataJSON = JSON.stringify([postData, commentsData]);
  const data = JSON.parse(dataJSON);
  const post = data[0];
  const comments = data[1];

  await closeConnection();

  return {
    props: {
      post,
      comments,
    },
    revalidate: 10,
  };
}
