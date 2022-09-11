import React from "react";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const AboutWrapper = styled.div`
  width: 95%;
  max-width: 60rem;
  padding: 1rem;
  margin: 2rem auto;
  font-size: 1.25rem;
`;
const Title = styled.h1`
  font-size: 48px;
  margin: 0;
  padding: 32px 0;
  text-align: center;
`;

export default function About() {
  return (
    <AboutWrapper>
      <Title>
        <TypeAnimation
          sequence={["About Us", 1000, "", 500]}
          repeat={Infinity}
          speed={20}
        />
      </Title>
      <p>
        We value your time, that&apos;s why we keep our content short, precise
        and easy to understand.
      </p>
    </AboutWrapper>
  );
}
