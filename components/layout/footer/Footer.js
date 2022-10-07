import React from "react";
import Link from "next/link";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  min-height: 100px;
  background-color: ${(c) => c.theme.colors.ui.secondary};
  color: white;
`;
const Copyright = styled.div``;
const Info = styled.div``;

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <FooterWrapper>
      <Copyright>
        &copy; <Link href="https://johnmwendwa.me">John Mwendwa</Link> {date}
      </Copyright>
    </FooterWrapper>
  );
}
