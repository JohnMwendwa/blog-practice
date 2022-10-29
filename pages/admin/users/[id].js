import { getSession } from "next-auth/react";
import User from "../../../components/admin/users/user";

export default function UserPage({ user }) {
  return <User user={user} />;
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
