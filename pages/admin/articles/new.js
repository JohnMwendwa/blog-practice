import { getSession } from "next-auth/react";
import NewArticle from "../../../components/admin/articles/new-article";

export default function NewArticlePage() {
  return <NewArticle />;
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
  } else if (!session.user.name.isAuthenticated) {
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
