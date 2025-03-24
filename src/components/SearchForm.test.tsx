import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  const mockSearch = vi.fn();
  const mockShowAll = vi.fn();

  const setup = (minLength = 4) => {
    render(<SearchForm onSearch={mockSearch} onShowAll={mockShowAll} minLength={minLength} />);
    const input = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    const showAllButton = screen.getByRole('button', { name: /show first 20/i });
    return { input, searchButton, showAllButton };
  };

  beforeEach(() => {
    mockSearch.mockClear();
    mockShowAll.mockClear();
  });

  it('shows error if query is too short', () => {
    const { input, searchButton } = setup();
    fireEvent.change(input, { target: { value: 'hi' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/please enter at least/i)).toBeInTheDocument();
    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch when query is valid', () => {
    const { input, searchButton } = setup();
    fireEvent.change(input, { target: { value: 'hello world' } });
    fireEvent.click(searchButton);

    expect(mockSearch).toHaveBeenCalledWith('hello world');
  });

  it('clears error when user starts typing', async () => {
    const { input, searchButton } = setup();
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/please enter at least/i)).toBeInTheDocument();

    // Now type more to clear error
    await userEvent.type(input, 'd');

    expect(screen.queryByText(/please enter at least/i)).not.toBeInTheDocument();
  });

  it('calls onShowAll when "Show first 20" is clicked', () => {
    const { showAllButton } = setup();
    fireEvent.click(showAllButton);
    expect(mockShowAll).toHaveBeenCalled();
  });
});
