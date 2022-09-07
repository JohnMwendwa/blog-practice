import React from "react";
import styled from "styled-components";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Navbar />
      <main> {children}</main>
      <Footer />
    </Container>
  );
}
