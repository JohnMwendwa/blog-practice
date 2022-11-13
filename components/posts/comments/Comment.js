import styled from "styled-components";

const Card = styled.div`
  padding: 0.5rem;
  border: 1px solid hsl(235, 100%, 90%);
  border-radius: 0.5rem;

  & .header {
    color: hsl(235, 50%, 67%);
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.75em;
  }
  & .name {
    font-weight: bold;
  }

  & .date {
  }

  & .message {
    white-space: pre-wrap;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export default function Comment({ body, user, date_uploaded }) {
  const formatedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(Date.parse(date_uploaded));
  return (
    <>
      <Card>
        <div className="header">
          <span className="name">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="date">{formatedDate}</span>
        </div>
        <div className="message">{body}</div>
      </Card>
    </>
  );
}
