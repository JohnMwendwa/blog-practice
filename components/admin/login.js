import React, { useRef, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 60vh;

  & a {
    font-weight: 900;
    color: ${(c) => c.theme.colors.ui.secondary};
  }

  & h2 {
    font-size: 2.5rem;
    font-family: jokerman;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
    margin-bottom: 10px;
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
  cursor: pointer;
`;

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/admin/messages");
    }
  }, [router, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(result);
  };

  return (
    <FormWrapper>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" required ref={emailRef} />
        <Input
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
        <Btn>Login</Btn>
      </Form>
      <p>
        Don&apos;t have an account? <Link href="/admin/signup">Signup</Link>
      </p>
    </FormWrapper>
  );
}
