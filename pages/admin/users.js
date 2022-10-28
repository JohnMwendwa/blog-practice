import Users from "../../components/admin/users";

export default function UsersPage() {
  return <Users />;
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
