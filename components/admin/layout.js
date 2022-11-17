import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import Footer from "../layout/footer/Footer";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(c) => c.theme.colors.ui.primary};
  color:white;
  padding: 20px 30px;
  color
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;
const Details = styled.div`
  margin-left: 10px;
  margin-right: 20px;

  & > p {
    text-transform: capitalize;
  }
  & p {
    margin: 0;
  }
  & p:last-child {
    font-size: 12px;
    color: yellow;
  }
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
`;

const Logo = styled.h2`
  font-family: jokerman;
  font-size: 2.5rem;
  margin: 0;
`;
const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const Sidebar = styled.nav`
  background-color: white;
  color: black;
  box-shadow: 0px 0px 5px;

  & ul {
    margin: 0;
    padding: 0;
    width: 150px;

    & li {
      list-style: none;
      color: black;

      &:hover {
        color: blue;
      }

      & a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 10px 30px;
      }
    }
    & li:first-child {
      margin-top: 10px;
    }
  }
`;
const Main = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding: 0 20px 30px;
`;

export default function Layout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/admin/login");
    }
  }, [session, router]);

  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <>
      <Header>
        <Logo>TECHme</Logo>
        <Profile>
          <>
            <Avatar
              src={session?.user.image}
              alt={session?.user.name}
              width={50}
              height={50}
            />
          </>
          <Details>
            <p>{session?.user.name}</p>
            <p>{session?.user.isAdmin ? "Admin" : "User"}</p>
          </Details>
        </Profile>
      </Header>

      <Container>
        <Sidebar>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>

            {session?.user.isAdmin && (
              <>
                <li>
                  <Link href="/admin/messages">Messages</Link>
                </li>
                <li>
                  <Link href="/admin/users">Users</Link>
                </li>
              </>
            )}

            {session?.user.isAuthenticated && (
              <>
                <li>
                  <Link href="/admin/articles">Articles</Link>
                </li>
                <li>
                  <Link href="/admin/comments">Comments</Link>
                </li>
              </>
            )}

            <li>
              <Link href="/admin/settings">Settings</Link>
            </li>
            <li onClick={logoutHandler}>
              <Link href="">Logout</Link>
            </li>
          </ul>
        </Sidebar>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
}
