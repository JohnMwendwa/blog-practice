import { getSession } from "next-auth/react";
import Settings from "../../components/admin/settings";

export default function SettingsPage() {
  return <Settings />;
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
      redirect: {
        destination: "/admin/settings",
        permanent: true,
      },
    };
  }
}
