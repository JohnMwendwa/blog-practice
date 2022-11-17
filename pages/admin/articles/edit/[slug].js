import { getSession } from "next-auth/react";
import EditArticle from "../../../../components/admin/articles/edit-article";
import { getPostDetails } from "../../../../helpers/posts_utils";

export default function EditArticlePage({ post }) {
  return <EditArticle post={post} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

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
