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

function CommentList({ comments, query }: { comments: Comment[]; query: string }) {
  return (
    <ul className="comment-list">
      {comments.map(comment => (
        <li key={comment.id}>
          <CommentItem comment={comment} query={query} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
