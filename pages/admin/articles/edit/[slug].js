import { getSession } from "next-auth/react";
import EditArticle from "../../../../components/admin/articles/edit-article";

export default function EditArticlePage(props) {
  return <EditArticle />;
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

  return {
    props: {},
  };
}
