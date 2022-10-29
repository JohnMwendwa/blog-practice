import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div``;

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

      <ol>
        {users.map((user) => (
          <li key={user._id}>
            <Link href={`/admin/users/${user._id}`}>
              <a>
                {user.firstName} {user.lastName}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </Wrapper>
  );
}
