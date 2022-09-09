import React from "react";
import { getPostData, getPostFiles } from "../../helpers/posts_utils";
import PostDetails from "../../components/posts/PostDetails";

export default function PostDetailsPage({ post }) {
  return <PostDetails post={post} />;
}

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = () => {
  const fileNames = getPostFiles();
  const slugs = fileNames.map((file) => file.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};
