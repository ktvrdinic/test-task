import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import PostList from './List';

const queryClient = new QueryClient();

// Mock the API responses
jest.mock('../../../services/post/List');
jest.mock('../../../services/user/User');
jest.useFakeTimers();
const { getPostList } = require('../../../services/post/List');
const { getUserById, getUser } = require('../../../services/user/User');

test('Renders PostList component', async () => {
 // Mock the API responses
 getPostList.mockResolvedValueOnce([
  { id: 1, title: 'Post 1', body: 'Body of Post 1', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Body of Post 2', userId: 2 },
 ]);
 getUserById.mockResolvedValueOnce({ id: 1, username: 'User1' });
 getUserById.mockResolvedValueOnce({ id: 2, username: 'User2' });

 render(
  <QueryClientProvider client={queryClient}>
   <MemoryRouter>
    <PostList />
   </MemoryRouter>
  </QueryClientProvider>
 );

 // Wait for the data to load
 await waitFor(() => {
  expect(screen.getByText('Post 1')).toBeInTheDocument();
  expect(screen.getByText('Post 2')).toBeInTheDocument();
  expect(screen.getByText('Body of Post 1')).toBeInTheDocument();
  expect(screen.getByText('Body of Post 2')).toBeInTheDocument();
  expect(screen.getByText('User1')).toBeInTheDocument();
  expect(screen.getByText('User2')).toBeInTheDocument();
 });
});

test('Filters posts by user name', async () => {
 // Mock the API responses
 getPostList.mockResolvedValueOnce([
  { id: 1, title: 'Post 1', body: 'Body of Post 1', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Body of Post 2', userId: 2 },
 ]);
 getUserById.mockResolvedValueOnce({ id: 1, username: 'User1' });
 getUserById.mockResolvedValueOnce({ id: 2, username: 'User2' });
 // Mock the getUser response for different search terms
 getUser.mockImplementation((value: string) => {
  const users = [
   { id: 1, username: 'User1' },
   { id: 2, username: 'User2' },
  ];
  return users.filter((user) => user.username.includes(value));
 });

 render(
  <QueryClientProvider client={queryClient}>
   <MemoryRouter>
    <PostList />
   </MemoryRouter>
  </QueryClientProvider>
 );

 // Perform your initial assertions
 expect(screen.getByText('Post 1')).toBeInTheDocument();
 expect(screen.getByText('Post 2')).toBeInTheDocument();
 expect(screen.getByText('Body of Post 1')).toBeInTheDocument();
 expect(screen.getByText('Body of Post 2')).toBeInTheDocument();
 expect(screen.getByText('User1')).toBeInTheDocument();
 expect(screen.getByText('User2')).toBeInTheDocument();

 // Type in the search input
 const searchInput = screen.getByPlaceholderText('Search by user name');
 userEvent.type(searchInput, 'User2');

 // Wait for the debounce (1 second) to complete
 await act(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
 });

 await waitFor(() => {
  expect(screen.getByText('Post 1')).toBeNull();
  expect(screen.getByText('Post 2')).toBeInTheDocument();
  expect(screen.getByText('Body of Post 1')).toBeNull();
  expect(screen.getByText('Body of Post 2')).toBeInTheDocument();
  expect(screen.getByText('User1')).toBeNull();
  expect(screen.getByText('User2')).toBeInTheDocument();
 });
});
