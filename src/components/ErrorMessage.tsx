import './ErrorMessage.css';

interface Props {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="error-box">
      <p>{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
