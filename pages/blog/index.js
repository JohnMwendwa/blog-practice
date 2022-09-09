import { getAllPosts } from "../../helpers/posts_utils";
import AllPosts from "../../components/posts/AllPosts";

export default function AllBlogPosts({ posts }) {
  if (!posts.length) return <></>;

  return <AllPosts posts={posts} />;
}

export const getStaticProps = () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
