import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import NewArticle from "../../../components/admin/articles/new-article";

export default function NewArticlePage() {
  return <NewArticle />;
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
    return {
      props: { session },
    };
  }
}
