import { useState, useEffect, useRef, FormEvent } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (query: string) => void;
  onShowAll: () => void;
  minLength: number;
}

function SearchForm({ onSearch, onShowAll, minLength }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query.length < minLength) {
      setError(`Please enter at least ${minLength} characters`);
      return;
    }

    setError('');
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (error) {
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search comment body..."
        value={query}
        onChange={handleChange}
      />
      <div className="buttons">
        <button type="submit">Search</button>
        <button type="button" onClick={onShowAll}>Show first 20</button>
      </div>
      {error && <div className="validation-error">{error}</div>}
    </form>
  );
}

export default SearchForm;
