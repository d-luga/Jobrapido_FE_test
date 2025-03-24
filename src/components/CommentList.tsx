import CommentItem from './CommentItem';
import './CommentList.css';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Props {
  comments: Comment[];
}

function CommentList({ comments }: Props) {
  return (
    <ul className="comment-list">
      {comments.map(comment => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
