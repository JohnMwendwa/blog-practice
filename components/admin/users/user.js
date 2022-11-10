import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

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

  & th,
  td {
    border: 1px solid #333;
    padding: 8px;
  }
  & td:first-child {
    font-weight: bold;
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
    text-align: left;
    color: white;
  }

  & button {
    cursor: pointer;
    background-color: #04aa6d;
    color: white;
    padding: 5px 20px;
    border: none;
  }
`;

export default function User() {
  const [user, setUser] = useState({});
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

    setUser(data);
  };

  const date = new Date(user?.createdAt).toDateString();

  return (
    <Wrapper>
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
      {error && <div>{error}</div>}
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
            <td>{user?.isAdmin ? "True" : "False"} </td>
            <td>
              <button onClick={changeAdmin}>Edit</button>
            </td>
          </tr>
          <tr>
            <td>isAuthenticated</td>
            <td>{user?.isAuthenticated ? "True" : "False"}</td>
            <td>
              <button onClick={handleAuthentication}>Edit</button>
            </td>
          </tr>
          <tr>
            <td>CreatedOn</td>
            <td>{date}</td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
