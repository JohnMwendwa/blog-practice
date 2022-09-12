import React from "react";
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";

const ContactWrapper = styled.div`
  width: 95%;
  max-width: 60rem;
  padding: 1rem;
  margin: 2rem auto;
  font-size: 1.25rem;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;
const Title = styled.h1`
  text-align: center;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NameInput = styled.input`
  font: inherit;
  border-radius: 4px;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgb(145, 141, 150);
  outline: none;

  &:focus {
    border: 1px solid ${(c) => c.theme.colors.ui.primary};
  }
`;
const EmailInput = styled(NameInput)`
  margin-top: 10px;
`;
const MessageInput = styled.textarea.attrs({
  rows: 5,
})`
  font: inherit;
  border-radius: 4px;
  width: 100%;
  padding: 0.25rem;
  margin-top: 10px;
  outline: none;
  border: 1px solid rgb(145, 141, 150);

  &:focus {
    border: 1px solid ${(c) => c.theme.colors.ui.primary};
  }
`;
const Divider = styled.div``;
const SubmitBtn = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: black;
  color: white;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(c) => c.theme.colors.ui.primary};
    border-color: orange;
  }
`;

export default function ContactForm() {
  return (
    <ContactWrapper>
      <Title>
        <TypeAnimation
          sequence={["Send your feedback", 1000, "Send your queries", 1000]}
          repeat={Infinity}
          speed={20}
        />
      </Title>
      <FormWrapper>
        <Divider>
          <NameInput placeholder="Enter name" />
          <EmailInput placeholder="Enter email" />
          <MessageInput placeholder="Enter your message" />
        </Divider>
        <SubmitBtn>Send Message</SubmitBtn>
      </FormWrapper>
    </ContactWrapper>
  );
}
