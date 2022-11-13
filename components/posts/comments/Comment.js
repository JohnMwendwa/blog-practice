import styled from "styled-components";
import IconBtn from "./IconBtn";
import { FaReply } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

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
  & .footer {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const Replies = styled.div`
  display: flex;

  & .hide {
    display: none;
  }

  & button {
    border: none;
    background: none;
    padding: 0;
    width: 15px;
    margin-top: 0.5rem;
    position: relative;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);

    & :hover::before,
    :focus-visible::before {
      background-color: hsl(235, 100%, 60%);
    }
  }
`;

export default function Comment({ _id, body, user, date_uploaded }) {
  const { getReplies } = usePost();
  const childComments = getReplies(_id);
  const hideChildren = false;

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
        <div className="footer">
          <IconBtn Icon={FaReply} aria-label="Reply" />

          <IconBtn Icon={FaEdit} aria-label="Edit" />

          <IconBtn Icon={FaTrash} aria-label="Delete" color="red" />
        </div>
      </Card>

      {childComments?.length > 0 && (
        <>
          <Replies className={`${hideChildren ? "hide" : ""}`}>
            <button aria-label="Hide-reples" />
          </Replies>
        </>
      )}
    </>
  );
}
