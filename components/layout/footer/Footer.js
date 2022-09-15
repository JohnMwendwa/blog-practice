import React from "react";
import Link from "next/link";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding: 20px;
  height: 80px;
  border-top: 1px solid black;
`;
const Copyright = styled.div``;
const Info = styled.div``;

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <FooterWrapper>
      <Copyright>&copy; {date}</Copyright>
      <Info>
        <Link href="mailto:info@blog.johnmwendwa.me">
          <a>John Mwendwa</a>
        </Link>
      </Info>
    </FooterWrapper>
  );
}
