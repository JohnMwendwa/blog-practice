import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  & > h2 {
    text-align: center;
  }
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: center;

  & td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & td:first-child {
    text-transform: capitalize;
    text-align: left;
  }

  & tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  & tr:hover {
    background-color: #ddd;
  }

  & th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #04aa6d;
    color: white;
  }

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: green;
    cursor: pointer;
  }
  .delete {
    color: red;
  }
  .edit {
    color: green;
  }
`;

const Btn = styled.button`
  padding: 10px;
  margin: auto;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
  outline: 1px solid ${(c) => c.theme.colors.ui.secondary};
`;

const Error = styled.p`
  color: red;
  font-weight: 600;
  margin-top: -15px;
  text-align: center;
`;
export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  const deleteUser = async (user) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}'s account?`
      )
    ) {
      const res = await fetch("/api/users/admin/delete-user", {
        method: "DELETE",
        body: JSON.stringify({ id: user._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      }
    }
  };

  return (
    <Wrapper>
      <h2>Users</h2>

      {error && <Error>{error}</Error>}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Authenticated</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user?.email}</td>
              <td>
                {user?.isAdmin ? (
                  <FaCheck className="edit" />
                ) : (
                  <FaTimes className="delete" />
                )}{" "}
              </td>
              <td>
                {user?.isAuthenticated ? (
                  <FaCheck className="edit" />
                ) : (
                  <FaTimes className="delete" />
                )}
              </td>
              <td>
                <Link href={`/admin/users/${user._id}`}>
                  <a>
                    <FaEdit className="edit" />
                  </a>
                </Link>
              </td>
              <td>
                <a onClick={() => deleteUser(user)} className="delete">
                  <FaTrash />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Btn onClick={fetchUsers}>Load more...</Btn>
    </Wrapper>
  );
}
