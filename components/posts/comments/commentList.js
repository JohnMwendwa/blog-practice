import Comment from "./Comment";

export default function CommentList({ comments }) {
  return comments.map((comment) => (
    <div key={comment._id}>
      <Comment {...comment} />
    </div>
  ));
}
