import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main> {children}</main>
      <Footer />
    </>
  );
}
