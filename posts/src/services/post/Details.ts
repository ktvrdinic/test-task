import { IPost } from '../../interfaces/post/List.interface';

// Fetcher function
export const getPostDetails = async (postId: string): Promise<IPost> => {
 const res = await fetch(
  `https://jsonplaceholder.typicode.com/posts/${postId}`
 );

 return res.json();
};

export const getPostComments = async (postId: string): Promise<IPost[]> => {
 const res = await fetch(
  `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
 );

 return res.json();
};
