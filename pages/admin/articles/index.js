import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Post from "../../../helpers/db/models/post";
import Articles from "../../../components/admin/articles/index";

export default function articles({ posts }) {
  return <Articles posts={posts} />;
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  } else if (!session.user.isAuthenticated) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  } else {
    await connectToDatabase();

    const postsData = await Post.find({ author: session.user.id });
    const postsJSON = JSON.stringify(postsData);
    const posts = JSON.parse(postsJSON);

    await closeConnection();
    return {
      props: { session, posts },
    };
  }
}
