import styled from "styled-components";
import Messages from "./Messages";

const Container = styled.div`
  display: flex;
  height: 70vh;
`;
const Sidebar = styled.div`
  background-color: grey;
  width: 150px;
  color: white;

  & li {
    margin: 15px auto;
  }
`;
const Main = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;

  & h2 {
    text-align: center;
  }
`;

export default function Layout() {
  return (
    <Container>
      <Sidebar>
        <nav>
          <ul>
            <li>Messages</li>
            <li>Users</li>
            <li>Articles</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </Sidebar>
      <Main>
        <Messages />
      </Main>
    </Container>
  );
}
