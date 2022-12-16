import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import {
  FaRegComments,
  FaRegCommentAlt,
  FaRegUser,
  FaHome,
  FaCog,
  FaBookOpen,
  FaRegCaretSquareLeft,
} from "react-icons/fa";

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

const Logo = styled.h2`
  font-family: jokerman;
  font-size: 2.5rem;
  margin: 0;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;

  & div {
    color: black;
    font-weight: 700;
    font-size: 1.8rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: black;
  vertical-align: middle;
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

const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const Sidebar = styled.nav`
  background-color: white;
  color: black;
  box-shadow: 0px 0px 5px;
  width: 150px;

  & ul {
    margin: 0;
    padding-left: 10px;

    & li {
      list-style: none;
      color: black;

      :hover {
        color: blue;
      }

      & a {
        display: flex;
        align-items: center;
        padding: 10px;

        & svg {
          margin-right: 5px;
        }
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
  overflow-y: auto;
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
    const data = await signOut({
      redirect: false,
      callbackUrl: "/admin/login",
    });
    router.push(data.url);
  };

  return (
    <>
      <Header>
        <Logo>TECHme</Logo>
        <Profile>
          <AvatarContainer>
            <Avatar
              src={session?.user.image}
              alt={session?.user.name}
              width={50}
              height={50}
            />
          </AvatarContainer>

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
              <Link href="/admin/dashboard">
                <a>
                  <FaHome />
                  Dashboard
                </a>
              </Link>
            </li>

            {session?.user.isAdmin && (
              <>
                <li>
                  <Link href="/admin/messages">
                    <a>
                      <FaRegCommentAlt />
                      Messages
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/users">
                    <a>
                      <FaRegUser />
                      Users
                    </a>
                  </Link>
                </li>
              </>
            )}

            {session?.user.isAuthenticated && (
              <>
                <li>
                  <Link href="/admin/articles">
                    <a>
                      <FaBookOpen />
                      Articles
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/comments">
                    <a>
                      <FaRegComments />
                      Comments
                    </a>
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link href="/admin/settings">
                <a>
                  <FaCog />
                  Settings
                </a>
              </Link>
            </li>
            <li onClick={logoutHandler}>
              <Link href="">
                <a>
                  <FaRegCaretSquareLeft />
                  Logout
                </a>
              </Link>
            </li>
          </ul>
        </Sidebar>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
}
