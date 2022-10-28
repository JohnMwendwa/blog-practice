import { useEffect } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  font-weight: 600;
  color: blue;
  margin-bottom: 20px;

  & span {
    cursor: pointer;
  }
`;

const Card = styled.div`
  margin: 5px 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: grey;
  outline: 1px solid ${(c) => c.theme.colors.ui.secondary};

  & h4 {
    margin: 5px 0 2px;
  }
  & p {
    margin: 0;
  }
`;

const Btn = styled.button`
  padding: 10px;
  width: 100px;
  margin: 20px auto;
  border: none;
  cursor: pointer;
  outline: 1px solid ${(c) => c.theme.colors.ui.secondary};
`;

export default function Messages() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      window.location.href = "/admin/login";
    }
  }, [session]);

  if (session)
    return (
      <>
        <h2>Notifications</h2>
        <TopBar>
          <span>All </span>
          <span>mark all as read</span>
        </TopBar>
        <Card>
          <h4>John Mwendwa</h4>
          <p>This is a message to you John</p>
        </Card>
        <Card>
          <h4>John Mwendwa</h4>
          <p>This is a message to you John</p>
        </Card>

        <Btn>Load more...</Btn>
      </>
    );
}
