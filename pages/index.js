import { getFeaturedPosts } from "../helpers/posts_utils";
import FeaturedPosts from "../components/homepage/FeaturedPosts";

export default function Home({ posts }) {
  if (!posts.length) return <></>;

  return (
    <div>
      <FeaturedPosts posts={posts} />
    </div>
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
