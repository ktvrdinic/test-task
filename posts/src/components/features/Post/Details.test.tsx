import { render, waitFor } from '@testing-library/react';
import { useQuery } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import PostDetail from './Details';

// Mock the API functions
jest.mock('react-query');
jest.mock('../../../services/post/Details');
const postId = 1;

test('renders PostDetail component with post details and comments', async () => {
 // Mock the API responses
 const postDetails = { id: postId, title: 'Post Title', body: 'Post Body' };
 const comments = [
  { id: 101, title: 'Comment 1', body: 'Comment Body 1' },
  { id: 102, title: 'Comment 2', body: 'Comment Body 2' },
 ];
 (useQuery as jest.Mock).mockReturnValueOnce({
  data: postDetails,
  isLoading: false,
  isError: false,
 });
 (useQuery as jest.Mock).mockReturnValueOnce({
  data: comments,
  isLoading: false,
  isError: false,
 });

 // Render the component with the required providers
 const { getByText } = render(
  <MemoryRouter initialEntries={[`/post/${postId}`]}>
   <Routes>
    <Route path='/post/:id' element={<PostDetail />}></Route>
   </Routes>
  </MemoryRouter>
 );

 // Wait for the data to load
 await waitFor(() => {
  // Perform your assertions
  expect(getByText('Post Title')).toBeInTheDocument();
  expect(getByText('Post Body')).toBeInTheDocument();
  expect(getByText('Comments:')).toBeInTheDocument();
  expect(getByText('Comment 1')).toBeInTheDocument();
  expect(getByText('Comment 2')).toBeInTheDocument();
  expect(getByText('Comment Body 1')).toBeInTheDocument();
  expect(getByText('Comment Body 2')).toBeInTheDocument();
 });
});

test('renders loading message while post details and comments are loading', async () => {
 // Mock the API responses with loading state
 (useQuery as jest.Mock).mockReturnValueOnce({
  isLoading: true,
  isError: false,
 });
 (useQuery as jest.Mock).mockReturnValueOnce({
  isLoading: true,
  isError: false,
 });

 // Render the component with the required providers
 const { getByText } = render(
  <MemoryRouter initialEntries={[`/post/${postId}`]}>
   <Routes>
    <Route path='/post/:id' element={<PostDetail />}></Route>
   </Routes>
  </MemoryRouter>
 );

 // Wait for the loading message to appear
 await waitFor(() => {
  // Perform your assertions
  expect(getByText('Is loading...')).toBeInTheDocument();
 });
});

test('renders error message when there is an error fetching data', async () => {
 // Mock the API responses with error state
 (useQuery as jest.Mock).mockReturnValueOnce({
  isLoading: false,
  isError: true,
 });
 (useQuery as jest.Mock).mockReturnValueOnce({
  isLoading: false,
  isError: true,
 });

 // Render the component with the required providers
 const { getByText } = render(
  <MemoryRouter initialEntries={[`/post/${postId}`]}>
   <Routes>
    <Route path='/post/:id' element={<PostDetail />}></Route>
   </Routes>
  </MemoryRouter>
 );

 // Wait for the error message to appear
 await waitFor(() => {
  // Perform your assertions
  expect(getByText('Error happened')).toBeInTheDocument();
 });
});
