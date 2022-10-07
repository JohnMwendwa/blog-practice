import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import Search from "../search/Search";

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 20px 40px 10px;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

const NavigationItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ListItems = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;

  @media (max-width: 600px) {
    justify-content: center;
    padding: 10px;
  }
`;

const ListItem = styled.li`
  margin-left: 16px;
  height: 2rem;
  font-size: 18px;
  color: white;

  > a {
    position: relative;
  }

  > a::before {
    content: "";
    margin: -8px 0;
    position: absolute;
    width: calc(100% + 10px);
    height: 4px;
    background-color: white;
    bottom: 0;
    left: -5px;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  a:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 600px) {
    padding-top: 10px;
  }
`;

const Logo = styled.div`
  font-size: 48px;
  font-family: Jokerman;
  color: white;
`;

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState(null);

  return (
    <NavWrapper>
      <NavigationItems>
        <Logo>
          <Link href="/">
            <a> TECHme</a>
          </Link>
        </Logo>
        <SearchContainer>
          <Search searchTerm={setSearchTerm} />
        </SearchContainer>
      </NavigationItems>
      <ListItems>
        <ListItem>
          <Link href="/posts">
            <a> Posts</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/about">
            <a> About</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/contact">
            <a> Contact</a>
          </Link>
        </ListItem>
      </ListItems>
    </NavWrapper>
  );
}
