import { QueryClient, QueryClientProvider } from 'react-query';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import PostList from './components/features/Post/List';
import PostDetail from './components/features/Post/Details';
import Navbar from './components/layout/Navbar';

// Initialze the client
const queryClient = new QueryClient();

function App() {
 return (
  <QueryClientProvider client={queryClient}>
   <Navbar />
   <Routes>
    <Route path='/' element={<PostList />} />
    <Route path='/post/:id' element={<PostDetail />} />
   </Routes>
  </QueryClientProvider>
 );
}

export default App;
