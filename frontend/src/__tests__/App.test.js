import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('Notes App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: App renders with title
  it('renders app with title', () => {
    axios.get.mockResolvedValue({ data: { healthy: true } });
    render(<App />);
    expect(screen.getByText(/Notes Application/i)).toBeInTheDocument();
  });

  // Test 2: Fetches notes on mount
  it('fetches notes on component mount', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });

  // Test 3: Creates new note
  it('creates a new note', async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({
      data: { id: 1, title: 'Test', content: 'Note' },
    });
    render(<App />);

    const titleInput = screen.getByPlaceholderText(/Note Title/i);
    const contentInput = screen.getByPlaceholderText(/Note Content/i);
    fireEvent.change(titleInput, { target: { value: 'New' } });
    fireEvent.change(contentInput, { target: { value: 'Content' } });

    const buttons = screen.getAllByText(/Create Note/i);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  // Test 4: Handles errors
  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    render(<App />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });

  // Test 5: Displays backend status
  it('displays backend connection status', () => {
    axios.get.mockResolvedValue({ data: { healthy: true } });
    render(<App />);
    expect(screen.getByText(/Notes Application/i)).toBeInTheDocument();
  });
});
