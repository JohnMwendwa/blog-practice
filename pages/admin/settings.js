import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { connectToDatabase, closeConnection } from "../../helpers/db/db";
import User from "../../helpers/db/models/user";
import Settings from "../../components/admin/settings";

export default function SettingsPage({ user }) {
  return <Settings user={user} />;
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
  } else {
    await connectToDatabase();

    const userData = await User.findOne({ email: session.user.email });
    const userJSON = JSON.stringify(userData);
    const user = JSON.parse(userJSON);

    await closeConnection();
    return {
      props: { session, user },
    };
  }
}
