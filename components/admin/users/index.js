import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div``;

export default function Users({ users = [] }) {
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
