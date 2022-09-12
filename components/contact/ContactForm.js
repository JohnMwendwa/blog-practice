import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import Notification from "../notification/Notification";

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

const sendMessage = async (details) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong!");
  }
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);
  const [error, setError] = useState(null);

  let notification;

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    try {
      await sendMessage({ name, email, message });

      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setError(e.message);
      setRequestStatus("error");
    }
  };

  if (requestStatus === "pending") {
    notification = {
      title: "Sending Message...",
      status: "pending",
      message: 'Your message is on it"s way',
    };
  }
  if (requestStatus === "success") {
    notification = {
      title: "Success",
      status: "success",
      message: "Message sent successfully",
    };
  }
  if (requestStatus === "error") {
    notification = {
      title: "Error!",
      status: "error",
      message: error || "something went wrong!",
    };
  }

  return (
    <ContactWrapper>
      <Title>
        <TypeAnimation
          sequence={["Send your feedback", 2000, "Send your queries", 2000]}
          repeat={Infinity}
          speed={20}
        />
      </Title>
      <FormWrapper onSubmit={handleSubmit}>
        <Divider>
          <NameInput
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <EmailInput
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MessageInput
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Divider>
        <SubmitBtn>Send Message</SubmitBtn>
      </FormWrapper>
      {notification && <Notification {...notification} />}
    </ContactWrapper>
  );
}
