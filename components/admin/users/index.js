import styled from "styled-components";

const Wrapper = styled.div``;

export default function Users({ users = [{ _id: 1, name: "john mwendwa" }] }) {
  console.log(users);
  return (
    <Wrapper>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} </li>
        ))}
      </ul>
    </Wrapper>
  );
}
