import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { connectToDatabase, closeConnection } from "../../helpers/db/db";
import Message from "../../helpers/db/models/message";
import Messages from "../../components/admin/Messages";

export default function MessagesPage({ messages }) {
  return <Messages messages={messages} />;
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

    const messagesData = await Message.find({});
    const messagesJSON = JSON.stringify(messagesData);
    const messages = JSON.parse(messagesJSON);

    await closeConnection();
    return {
      props: { session, messages },
    };
  }
}
