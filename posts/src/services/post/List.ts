import { IPost } from '../../interfaces/post/List.interface';

// Fetcher function
export const getPostList = async (userId: string): Promise<IPost[]> => {
 const url = new URL('https://jsonplaceholder.typicode.com/posts');

 if (userId) url.searchParams.set('userId', userId);

 const res = await fetch(url);

 return res.json();
};
