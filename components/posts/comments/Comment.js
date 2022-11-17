import { useState } from "react";
import styled from "styled-components";
import { FaReply } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";

import CommentList from "./commentList";
import { usePost } from "../../contexts/PostContext";
import CommentForm from "./commentForm";
import IconBtn from "./IconBtn";

const Card = styled.div`
  padding: 0.5rem;
  border: 1px solid hsl(235, 100%, 90%);
  border-radius: 0.5rem;

  .header {
    color: hsl(235, 50%, 67%);
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.75em;
  }

  .name {
    font-weight: bold;
  }

  .date {
  }

  .message {
    white-space: pre-wrap;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .footer {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const Replies = styled.div`
  display: flex;

  & > button {
    border: none;
    background: none;
    padding: 0;
    width: 15px;
    margin-top: 0.5rem;
    position: relative;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);

    :hover::before,
    :focus-visible::before {
      background-color: hsl(235, 100%, 60%);
    }
  }

  .collapse-line {
    border: none;
    background: none;
    padding: 0;
    width: 15px;
    margin-top: 0.5rem;
    position: relative;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);

    :hover::before,
    :focus-visible::before {
      background-color: hsl(235, 100%, 60%);
    }

    ::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background-color: hsl(235, 50%, 74%);
      transition: background-color 100ms ease-in-out;
    }
  }

  .child-comments {
    padding-left: 0.5rem;
    flex-grow: 1;
  }

  .hide {
    display: none;
  }
`;

const ShowRepliesBtn = styled.button`
  --hue: 235;
  --color: hsl(var(--hue), 100%, 67%);
  padding: 0.5em 1em;
  margin-top: 0.25rem;
  background: var(--color);
  border: none;
  color: white;
  border-radius: 0.5em;
  font-size: 0.75em;
  cursor: pointer;

  :hover,
  :focus-visible {
    --color: hsl(var(--hue), 100%, 74%);
  }

  .hide {
    display: none;
  }
`;
const Separator = styled.div`
  margin-top: 0.5rem;
  margin-left: 1.5rem;
`;

export default function Comment({ _id, body, user, date_uploaded }) {
  const { data: session } = useSession();
  const {
    getReplies,
    loading,
    error,
    onCreateComment,
    onUpdateComment,
    onDeleteComment,
  } = usePost();
  const childComments = getReplies(_id);
  const [hideChildren, setHideChildren] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onCommentReply = async (message) => {
    await onCreateComment(message, _id);
    setIsReplying(false);
  };

  const onCommentUpdate = async (message) => {
    await onUpdateComment(message, _id);
    setIsEditing(false);
  };

  const formatedDate = new Intl.DateTimeFormat("en-us", {
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
          <IconBtn
            Icon={FaReply}
            isActive={isReplying}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
            onClick={() => setIsReplying(!isReplying)}
          />

          {session && (session.user.id === user._id || session.user.isAdmin) && (
            <>
              <IconBtn
                Icon={FaEdit}
                isActive={isEditing}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
                onClick={() => setIsEditing(!isEditing)}
              />

              <IconBtn
                Icon={FaTrash}
                aria-label="Delete"
                color="red"
                onClick={() => onDeleteComment(_id)}
              />
            </>
          )}
        </div>
      </Card>

      {isReplying && (
        <Separator>
          <CommentForm
            autoFocus
            error={error}
            loading={loading}
            onSendComment={onCommentReply}
          />
        </Separator>
      )}

      {isEditing && (
        <Separator>
          <CommentForm
            autoFocus
            error={error}
            loading={loading}
            initialValue={body}
            onSendComment={onCommentUpdate}
          />
        </Separator>
      )}

      {childComments?.length && (
        <>
          <Replies className={`${hideChildren ? "hide" : ""}`}>
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setHideChildren(true)}
            />
            <div className="child-comments">
              <CommentList comments={childComments} />
            </div>
          </Replies>

          <ShowRepliesBtn
            className={`${!hideChildren ? "hide" : ""}`}
            onClick={() => setHideChildren(false)}
          >
            Show Replies
          </ShowRepliesBtn>
        </>
      )}
    </>
  );
}
