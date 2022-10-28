import { getSession } from "next-auth/react";

export default function AdminPage() {
  return;
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
        destination: "/admin/messages",
        permanent: true,
      },
    };
  }
}
