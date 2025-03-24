import { useState } from 'react';
import SearchForm from './components/SearchForm';
import CommentList from './components/CommentList';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [lastAction, setLastAction] = useState<'search' | 'initial' | null>(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/comments';
  const MIN_QUERY_LENGTH = 4; // the search should be performed only for search text longer than 3 characters

  const handleSearch = async (query: string) => {
    if (query.length < MIN_QUERY_LENGTH) return;

    setLoading(true);
    setError('');
    setHasSearched(true);
    setLastAction('search');

    try {
      const res = await fetch(API_URL);
      const data: Comment[] = await res.json();
      const filtered = data
        .filter(c => c.body.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 20);

      setComments(filtered);
    } catch (e) {
      setError('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const loadInitialComments = async () => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    setLastAction('initial');

    try {
      const res = await fetch(API_URL);
      const data: Comment[] = await res.json();
      setComments(data.slice(0, 20));
    } catch (e) {
      setError('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const retryLastAction = () => {
    if (lastAction === 'search') {
      handleSearch(comments[0]?.body || 'test');
    } else if (lastAction === 'initial') {
      loadInitialComments();
    }
  };

  const getResultsMessage = () => {
    if (comments.length === 0) return 'No comments found';
    return `Found ${comments.length} comment${comments.length > 1 ? 's' : ''}`;
  };

  return (
    <div className="app-container">
      <SearchForm 
        onSearch={handleSearch} 
        onShowAll={loadInitialComments} 
        minLength={MIN_QUERY_LENGTH}
      />
      <div className="status">
        {loading && <p>Loading...</p>}
        {error && <ErrorMessage message={error} onRetry={retryLastAction} />}
        {!loading && hasSearched && <p>{getResultsMessage()}</p>}
      </div>
      <CommentList comments={comments} />
    </div>
  );
}

export default App;
