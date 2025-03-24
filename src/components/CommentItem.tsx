import './CommentItem.css';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Props {
  comment: Comment;
}

function CommentItem({ comment }: Props) {
  const shortBody = comment.body.length > 64
    ? comment.body.slice(0, 61) + '...'
    : comment.body;

  return (
    <div className="comment-item">
      <h3>{comment.name}</h3>
      <p><strong>Email:</strong> {comment.email}</p>
      <p>{shortBody}</p>
    </div>
  );
}

export default CommentItem;
