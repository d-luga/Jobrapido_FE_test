import { useState } from 'react';
import SearchForm from './components/SearchForm';
import CommentList from './components/CommentList';
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

  const handleSearch = async (query: string) => {
    if (query.length < 4) return;

    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments');
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
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data: Comment[] = await res.json();
      setComments(data.slice(0, 20));
    } catch (e) {
      setError('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const getResultsMessage = () => {
    if (comments.length === 0) return 'No comments found';
    return `Found ${comments.length} comment${comments.length > 1 ? 's' : ''}`;
  };

  return (
    <div className="app-container">
      <SearchForm onSearch={handleSearch} onShowAll={loadInitialComments} />
      <div className="status">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && hasSearched && <p>{getResultsMessage()}</p>}
      </div>
      <CommentList comments={comments} />
    </div>
  );
}

export default App;
