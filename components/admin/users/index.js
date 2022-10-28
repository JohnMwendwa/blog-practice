import styled from "styled-components";
import User from "./user";

const Wrapper = styled.div``;

export default function Users({ users = [] }) {
  return (
    <Wrapper>
      <h2>Users</h2>

      <ol>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </ol>
    </Wrapper>
  );
}
