import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import Search from "../search/Search";

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 10px;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

const NavigationItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ListItems = styled.ul`
  display: flex;
  list-style: none;
`;

const ListItem = styled.li`
  margin-left: 8px;
  font-size: 18px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 32px;
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
      </NavigationItems>
      <SearchContainer>
        <Search searchTerm={setSearchTerm} />
      </SearchContainer>
    </NavWrapper>
  );
}
