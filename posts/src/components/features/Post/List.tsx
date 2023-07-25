// PostList.js
import { useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPostList } from '../../../services/post/List';
import { getUser, getUserById } from '../../../services/user/User';
import '../../../styles/post/List.scss';
import LoggerHOC from '../../../utils/LoggerHOC';
import { FIFE_MINUTES_IN_MILLISECONDS } from '../../../utils/constants';
import debounce from '../../../utils/debounce';

const PostList = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const [userId, setUserId] = useState('');

 const {
  data: posts,
  isLoading,
  isError,
 } = useQuery(['posts', userId], async () => await getPostList(userId), {
  staleTime: FIFE_MINUTES_IN_MILLISECONDS,
 });

 if (isError) return <div>Something went wrong</div>;

 const postQueries = useQueries(
  posts?.map((post) => ({
   queryKey: ['user', post.userId],
   queryFn: async () => await getUserById(post.userId),
   staleTime: FIFE_MINUTES_IN_MILLISECONDS,
  })) || []
 );

 const debouncedSearch = debounce(async (value) => {
  setSearchTerm(value);
  const user = value ? await getUser('username', value) : [];

  if (user.length) setUserId(String(user[0].id));
  else if (value === '') setUserId('');
  else setUserId('-1');
 }, 700);

 const handleSearch = (event: any) => {
  const { value } = event.target;

  debouncedSearch(value);
 };

 return (
  <LoggerHOC componentName={PostList.name} message='Hello from'>
   <div className='post-list'>
    <input
     type='text'
     defaultValue={searchTerm}
     onChange={handleSearch}
     placeholder='Search by user name'
     className='post-list__search-input'
    />
    <ul className='post-list__list'>
     {!isLoading ? (
      posts?.map((post, index) => {
       const userQuery = postQueries[index];
       const { data: user, isLoading } = userQuery;

       return (
        <Link
         to={`/post/${post.id.toString()}`}
         className='post-list__link'
         key={index}
        >
         <li className='post-list__item'>
          <div className='post-list__title'>{post.title}</div>
          <div className='post-list__body'>{post.body}</div>

          {isLoading ? (
           <>Is loading...</>
          ) : (
           <span className='post-list__user'>
            {user?.username ?? 'Unknown User'}
           </span>
          )}
          <br />
         </li>
        </Link>
       );
      })
     ) : (
      <>Loading posts...</>
     )}
    </ul>
   </div>
  </LoggerHOC>
 );
};

export default PostList;
