import { useState, useEffect } from "react";
import styled from "styled-components";

const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;

  & > div {
    color: red;
    margin-top: -10px;
    text-align: center;
  }

  & form {
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
  }
`;
const Message = styled.div`
  color: green;
  margin-top: -10px;
  text-align: center;
`;

export default function AccountSettings({ user }) {
  const [firstName, setFirstName] = useState(`${user.firstName}`);
  const [lastName, setLastName] = useState(`${user.lastName}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/update-user", {
        method: "PATCH",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      }

      setMessage(data.message);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Details>
      <h2>Account Settings</h2>

      {message && <Message>{message}</Message>}
      {error && <div>{error}</div>}

      <form onSubmit={handleUpdate}>
        <label htmlFor="firstname">
          First name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstname"
          />
        </label>

        <label htmlFor="lastname">
          Last name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button>Update</button>
      </form>
    </Details>
  );
}
