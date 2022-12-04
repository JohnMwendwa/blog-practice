import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
import Post from "../../../../helpers/db/models/post";
import EditArticle from "../../../../components/admin/articles/edit-article";

export default function EditArticlePage({ post }) {
  return <EditArticle post={post} />;
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
  }

  if (!session.user.isAuthenticated) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  await connectToDatabase();
  const slug = context.query.slug;
  const postData = await Post.findOne({ slug });
  const postJSON = JSON.stringify(postData);
  const post = JSON.parse(postJSON);

  await closeConnection();

  if (session.user.id !== post.author) {
    return {
      redirect: {
        destination: "/admin/articles",
        permanent: false,
      },
    };
  }
  return {
    props: {
      post,
    },
  };
}
