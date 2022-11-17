import { getSession } from "next-auth/react";
import Login from "../../components/admin/login";

export default function LoginPage() {
  return <Login />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

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
