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

  const date = new Date(user?.createdAt).toDateString();

  return (
    <Wrapper>
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
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
            <td>
              <button>Edit</button>
            </td>
          </tr>
          <tr>
            <td>isAdmin</td>
            <td>{user?.isAdmin ? "True" : "False"} </td>
            <td>
              <button>Edit</button>
            </td>
          </tr>
          <tr>
            <td>isAuthenticated</td>
            <td>{user?.isAuthenticated ? "True" : "False"}</td>
            <td>
              <button>Edit</button>
            </td>
          </tr>
          <tr>
            <td>CreatedOn</td>
            <td>{date}</td>
            <td>
              <button>Edit</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
