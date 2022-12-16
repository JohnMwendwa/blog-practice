import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Users from "../../../components/admin/users/index";
import User from "../../../helpers/db/models/user";

export default function UsersPage({ users }) {
  return <Users users={users} />;
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

    const usersData = await User.find({});
    const usersJSON = JSON.stringify(usersData);
    const users = JSON.parse(usersJSON);

    await closeConnection();

    return {
      props: { session, users },
    };
  }
}
