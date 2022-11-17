import { getSession } from "next-auth/react";

export default function EditArticlePage(props) {
  return <div>Editing</div>;
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
