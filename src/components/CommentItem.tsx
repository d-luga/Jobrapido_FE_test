import './CommentItem.css';
import { createFlexibleQueryRegex, getContextPreview } from '../utils';


interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Props {
  comment: Comment;
  query: string;
}

function CommentItem({ comment, query }: Props) {
  const match = createFlexibleQueryRegex(query).exec(comment.body);
  let preview = comment.body.slice(0, 64); // fallback

  if (match && match.index !== undefined) {
    preview = getContextPreview(comment.body, match.index, match[0].length);
  }

  const highlighted = query
    ? preview.replace(
        createFlexibleQueryRegex(query),
        (match) => `<strong class="match">${match}</strong>`
      )
    : preview;

  return (
    <div className="comment-item">
      <h3>{comment.name}</h3>
      <p><strong>Email:</strong> {comment.email}</p>
      <p dangerouslySetInnerHTML={{ __html: highlighted }} />
    </div>
  );
}

export default CommentItem;
