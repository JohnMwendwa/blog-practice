import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Login from "../../components/admin/login";

export default function LoginPage() {
  return <Login />;
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
