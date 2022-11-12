import React from "react";
import Head from "next/head";
import { getPostDetails } from "../helpers/posts_utils";
import PostDetails from "../components/posts/PostDetails";

export default function PostDetailsPage({ post }) {
  return (
    <>
      <PostDetails post={post} />
    </>
  );
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const postData = await getPostDetails(slug);
  const post = JSON.parse(postData);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
