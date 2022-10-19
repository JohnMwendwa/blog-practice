import styled from "styled-components";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  font-weight: 600;
  color: blue;
  margin-bottom: 20px;
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

export default function Messages() {
  return (
    <>
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
    </>
  );
}
