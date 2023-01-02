import { useEffect, useState } from "react";
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

import CustomLink from "../links/CustomLink";
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
  transition: all 0.3s linear;

  #mobile-sidebar {
    display: none;
  }

  & ul {
    margin: 0;
    padding: 0;
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
  @media screen and (max-width: 700px) {
    width: 50px;

    #mobile-sidebar {
      display: block;
    }
    .sidebar {
      display: none;
    }

    ul {
      padding: 0;

      & li a {
        justify-content:center;
        padding: 10px 0;
  
          & svg {
           margin:0
          }
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    width: 20px;
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
      router.replace("/admin/login");
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
          <ul className="sidebar">
            <li>
              <CustomLink href="/admin/dashboard">
                <a>
                  <FaHome />
                  Dashboard
                </a>
              </CustomLink>
            </li>

            {session?.user.isAdmin && (
              <>
                <li>
                  <CustomLink href="/admin/messages">
                    <a>
                      <FaRegCommentAlt />
                      Messages
                    </a>
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href="/admin/users">
                    <a>
                      <FaRegUser />
                      Users
                    </a>
                  </CustomLink>
                </li>
              </>
            )}

            {session?.user.isAuthenticated && (
              <>
                <li>
                  <CustomLink href="/admin/articles">
                    <a>
                      <FaBookOpen />
                      Articles
                    </a>
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href="/admin/comments">
                    <a>
                      <FaRegComments />
                      Comments
                    </a>
                  </CustomLink>
                </li>
              </>
            )}

            <li>
              <CustomLink href="/admin/settings">
                <a>
                  <FaCog />
                  Settings
                </a>
              </CustomLink>
            </li>
            <li onClick={logoutHandler}>
              <CustomLink href="">
                <a>
                  <FaRegCaretSquareLeft />
                  Logout
                </a>
              </CustomLink>
            </li>
          </ul>

          <ul id="mobile-sidebar">
            <li>
              <CustomLink href="/admin/dashboard">
                <a>
                  <FaHome />
                </a>
              </CustomLink>
            </li>

            {session?.user.isAdmin && (
              <>
                <li>
                  <CustomLink href="/admin/messages">
                    <a>
                      <FaRegCommentAlt />
                    </a>
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href="/admin/users">
                    <a>
                      <FaRegUser />
                    </a>
                  </CustomLink>
                </li>
              </>
            )}

            {session?.user.isAuthenticated && (
              <>
                <li>
                  <CustomLink href="/admin/articles">
                    <a>
                      <FaBookOpen />
                    </a>
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href="/admin/comments">
                    <a>
                      <FaRegComments />
                    </a>
                  </CustomLink>
                </li>
              </>
            )}

            <li>
              <CustomLink href="/admin/settings">
                <a>
                  <FaCog />
                </a>
              </CustomLink>
            </li>
            <li onClick={logoutHandler}>
              <CustomLink href="">
                <a>
                  <FaRegCaretSquareLeft />
                </a>
              </CustomLink>
            </li>
          </ul>
        </Sidebar>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
}
