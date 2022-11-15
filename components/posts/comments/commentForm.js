import { useState } from "react";
import styled from "styled-components";

const Form = styled.form``;
const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  height: 70px;
  border-radius: 0.5em;
  padding: 0.5em;
  font-size: inherit;
  font-family: inherit;
  border: 2px solid hsl(235, 50%, 74%);
  line-height: 1.4;

  $ :focus {
    border-color: hsl(235, 100%, 67%);
    outline: none;
  }
`;
const Btn = styled.button`
  background-color: blue;
  padding: 0.5em 1em;
  border: none;
  color: white;
  border-radius: 0.5em;
  font-size: 0.75em;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    ` --color: hsl(var(--hue), 20%, 74%);
    background-color:grey
}`}
`;

const Error = styled.div`
  color: hsl(0, 100%, 67%);
`;

export default function CommentForm({
  autoFocus = false,
  onSendComment,
  loading,
  error,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSendComment(message);
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <TextArea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Btn type="submit" disabled={loading}>
          {loading ? "Loading" : "Post"}
        </Btn>
      </Wrapper>

      {error && <Error>{error}</Error>}
    </Form>
  );
}
