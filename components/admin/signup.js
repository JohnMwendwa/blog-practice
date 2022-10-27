import React, { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 400px;
  margin-bottom: 30px;

  & h2 {
    font-size: 2.5rem;
    font-family: jokerman;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  & a {
    font-weight: 900;
    color: ${(c) => c.theme.colors.ui.secondary};
  }
`;
const Form = styled.form``;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: 1px solid ${(c) => c.theme.colors.ui.secondary};
  margin: 5px 0;
  text-align: center;
`;
const Btn = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 10px 0;
  font-size: 1.2rem;
  background-color: ${(c) => c.theme.colors.ui.secondary};
  color: white;
  margin-bottom: 0;
`;

async function createUser(firstName, lastName, email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FormWrapper>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First name"
          required
          ref={firstNameRef}
        />
        <Input type="text" placeholder="Last name" required ref={lastNameRef} />
        <Input type="email" placeholder="Email" required ref={emailRef} />
        <Input
          type="password"
          placeholder="Enter password"
          required
          ref={passwordRef}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          required
          ref={confirmPasswordRef}
        />
        <Btn>Signup</Btn>
      </Form>
      <p>
        Already have an account? <Link href="/admin/login">Login</Link>
      </p>
    </FormWrapper>
  );
}
