import styled from "styled-components";
import Comment from "./Comment";

const Wrapper = styled.div`
  margin: 0.5rem 0;
`;

export default function CommentList({ comments }) {
  return comments.map((comment) => (
    <Wrapper key={comment._id}>
      <Comment {...comment} />
    </Wrapper>
  ));
}
