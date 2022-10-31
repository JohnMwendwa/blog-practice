import { getSession } from "next-auth/react";
import Dashboard from "../../components/admin/dashboard";

export default function DashboardPage() {
  return <Dashboard />;
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
