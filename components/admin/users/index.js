import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

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

  & td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & td:first-child {
    text-transform: capitalize;
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
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }

  & a {
    display: block;
    width: 100%;
    height: 100%;
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

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  return (
    <Wrapper>
      <h2>Users</h2>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Authenticated</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user?.email}</td>
              <td>{user?.isAdmin ? "True" : "False"} </td>
              <td>{user?.isAuthenticated ? "True" : "False"}</td>
              <td>
                <Link href={`/admin/users/${user._id}`}>
                  <a>View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Btn onClick={fetchUsers}>Load more...</Btn>
    </Wrapper>
  );
}
