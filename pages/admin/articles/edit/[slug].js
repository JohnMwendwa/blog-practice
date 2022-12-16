import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import EditArticle from "../../../../components/admin/articles/edit-article";
import { getPostDetails } from "../../../../helpers/posts_utils";

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
  const slug = context.query.slug;
  const postData = await getPostDetails(slug);
  const post = JSON.parse(postData);

  return {
    props: {
      post,
    },
  };
}
