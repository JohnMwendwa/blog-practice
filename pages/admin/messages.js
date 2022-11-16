import { getSession } from "next-auth/react";

import Messages from "../../components/admin/Messages";

export default function MessagesPage() {
  return <Messages />;
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
  } else if (!session.user.isAdmin) {
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
