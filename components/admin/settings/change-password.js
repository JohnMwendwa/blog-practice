import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 20px;
  margin: 0 auto;

  & label {
    display: block;

    & input {
      padding: 5px 10px;
      margin-bottom: 10px;
      display: block;
      border: none;
      outline: 1px solid;
    }
  }

  & button {
    width: 100%;
    padding: 8px 0;
    margin-top: 5px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default function ChangePassword({ user }) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password don't match!");
      return;
    }
  };

  return (
    <Container>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">
          Old password
          <input
            type="password"
            placeholder="old passord"
            id="oldPassword"
            ref={oldPasswordRef}
          />
        </label>

        <label htmlFor="newPassword">
          New password
          <input
            type="password"
            placeholder="new password"
            id="newPassword"
            ref={newPasswordRef}
          />
        </label>

        <label htmlFor="consfirmPassword">
          Confirm new password
          <input
            type="password"
            placeholder="confirm new password"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
        </label>

        <button>Update</button>
      </form>
    </Container>
  );
}
