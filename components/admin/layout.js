import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import Footer from "../layout/footer/Footer";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${(c) => c.theme.colors.ui.primary};
  padding: 20px 30px;
`;
const Profile = styled.div``;
const Avatar = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #333;
`;

const Logo = styled.h2`
  font-family: jokerman;
  font-size: 2.5rem;
  color: white;
  margin: 0;
`;
const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const Sidebar = styled.div`
  background-color: grey;
  width: 150px;
  color: white;

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
          <h3>John Mwendwa</h3>
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
