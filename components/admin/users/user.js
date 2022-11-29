import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Wrapper = styled.div`
  & > h2 {
    font-family: jokerman;
    text-align: center;
  }
`;
const Table = styled.table`
  border: 1px solid #333;
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
  text-align: center;

  & th,
  td {
    border: 1px solid #333;
    padding: 8px;
  }
  & td:first-child {
    font-weight: bold;
    text-align: left;
  }

  & tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  & tr:hover {
    background-color: #ddd;
  }

  & th {
    background-color: ${(c) => c.theme.colors.ui.secondary};
    padding-top: 12px;
    padding-bottom: 12px;

    color: white;
  }

  & button {
    display: block;
    cursor: pointer;
    background-color: #04aa6d;
    color: white;
    padding: 5px 20px;
    border: none;
    margin: auto;
  }
  .edit {
    color: green;
  }
  .delete {
    color: red;
  }
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: -20px;
  padding: 5px 0;
`;

const Btn = styled.button`
  display: block;
  margin: 20px auto;
  padding: 5px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const Message = styled(Error)`
  color: green;
`;

export default function User() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();

      if (mounted) {
        setUser(data);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [id]);

  // Clear error state after 5 seconds
  useEffect(() => {
    let timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    if (message) {
      timeout = setTimeout(() => {
        setMessage("");
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error, message]);

  const handleAuthentication = async () => {
    const res = await fetch("/api/users/admin/authenticate", {
      method: "PATCH",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setMessage(data.message);
    setUser(data);
  };

  const changeAdmin = async () => {
    const res = await fetch("/api/users/admin/change-admin", {
      method: "PATCH",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setMessage(data.message);
    setUser(data);
  };

  const date = new Date(user?.createdAt).toDateString();

  return (
    <Wrapper>
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>

      {error && <Error>{error}</Error>}
      {message && <Message>{message}</Message>}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>isAdmin</td>
            <td>
              {user?.isAdmin ? (
                <FaCheck className="edit" />
              ) : (
                <FaTimes className="delete" />
              )}{" "}
            </td>
            <td>
              <button onClick={changeAdmin}>
                <FaEdit />
              </button>
            </td>
          </tr>
          <tr>
            <td>isAuthenticated</td>
            <td>
              {user?.isAuthenticated ? (
                <FaCheck className="edit" />
              ) : (
                <FaTimes className="delete" />
              )}
            </td>
            <td>
              <button onClick={handleAuthentication}>
                <FaEdit />
              </button>
            </td>
          </tr>
          <tr>
            <td>CreatedOn</td>
            <td>{date}</td>
          </tr>
        </tbody>
      </Table>

      <Btn onClick={() => router.back()}>Back</Btn>
    </Wrapper>
  );
}
