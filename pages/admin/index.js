import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default function AdminPage() {
  return;
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
    return {
      props: { session },
      redirect: {
        destination: "/admin/dashboard",
        permanent: true,
      },
    };
  }
}
