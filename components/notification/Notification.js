import ReactDom from "react-dom";
import styled from "styled-components";

const NotificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #dfdbe6;
  background-color: #343036;
  padding: 0 2rem;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  height: 5rem;
  bottom: 0;
  width: 100%;
  left: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  &.succes {
    background-color: ${(c) => c.theme.colors.ui.success};
    color: white;
  }
  &.error {
    background-color: ${(c) => c.theme.colors.ui.error};
  }

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;
const Paragraph = styled.p`
  margin: 0;
`;

export default function Notification({ title, message, status }) {
  let statusClass = "";

  if (status === "success") {
    statusClass = "success";
  }

  if (status === "error") {
    statusClass = "error";
  }

  return ReactDom.createPortal(
    <NotificationContainer className={statusClass}>
      <Title>{title}</Title>
      <Paragraph>{message}</Paragraph>
    </NotificationContainer>,
    document.getElementById("notifications")
  );
}
