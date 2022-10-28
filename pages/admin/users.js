import { getSession } from "next-auth/react";
import Users from "../../components/admin/users/index";

export default function UsersPage() {
  return <Users />;
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
  } else {
    return {
      props: { session },
    };
  }
}
