import React from "react";
import Head from "next/head";
import { getPostDetails, getPostSlugs } from "../helpers/posts_utils";
import PostDetails from "../components/posts/PostDetails";
import { PostProvider } from "../components/contexts/PostContext";

export default function PostDetailsPage({ post }) {
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

      <PostProvider post={post}>
        <PostDetails post={post} />
      </PostProvider>
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

export const getStaticPaths = async () => {
  const slugData = await getPostSlugs();
  const slugs = JSON.parse(slugData);

  return {
    paths: slugs.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};
