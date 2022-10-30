import Link from "next/link";
import Image from "next/image";
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
  & p {
    margin: 0;
  }
  & p:last-child {
    font-size: 12px;
    color: yellow;
  }
`;
const Avatar = styled(Image)`
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

const Sidebar = styled.div`
  background-color: white;
  width: 150px;
  color: black;
  box-shadow: 0px 0px 5px;

  & li {
    margin: 15px auto;
  }
`;
const Main = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding: 0 20px;

  & h2 {
    text-align: center;
  }
`;

export default function Layout({ children }) {
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <>
      <Header>
        <Logo>TECHme</Logo>
        <Profile>
          <>
            <Avatar
              src=""
              alt={session.user.name.firstName}
              width={50}
              height={50}
            />
          </>
          <Details>
            <p>{session.user.name.firstName}</p>
            <p>{session.user.name.isAdmin ? "Admin" : "User"}</p>
          </Details>
        </Profile>
      </Header>

      <Container>
        <Sidebar>
          <nav>
            <ul>
              <li>
                <Link href="/admin/dashbord">Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/messages">Messages</Link>
              </li>
              {session.user?.name.isAdmin && (
                <li>
                  <Link href="/admin/users">Users</Link>
                </li>
              )}
              <li>
                <Link href="/admin/articles">Articles</Link>
              </li>
              <li>
                <Link href="/admin/settings">Settings</Link>
              </li>
              <li onClick={logoutHandler}>
                <Link href="/admin/logout">Logout</Link>
              </li>
            </ul>
          </nav>
        </Sidebar>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
}
