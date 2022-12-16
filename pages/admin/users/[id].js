import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Users from "../../../helpers/db/models/user";
import User from "../../../components/admin/users/user";

export default function UserPage({ user }) {
  return <User user={user} />;
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
  } else if (!session.user.isAdmin) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  } else {
    await connectToDatabase();

    const userData = await Users.findById({ _id: context.params.id });
    const userJSON = JSON.stringify(userData);
    const user = JSON.parse(userJSON);

    await closeConnection();

    return {
      props: { session, user },
    };
  }
}
