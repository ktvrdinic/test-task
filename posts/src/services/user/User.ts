import { IUser } from '../../interfaces/user/User.interface';

export const getUser = async (key: string, value: string): Promise<IUser[]> => {
 const url = new URL('https://jsonplaceholder.typicode.com/users');

 if (value) url.searchParams.set(key, value);

 const res = await fetch(url);

 return res.json();
};

export const getUserById = async (userId: string | number): Promise<IUser> => {
 const res = await fetch(
  `https://jsonplaceholder.typicode.com/users/${userId}`
 );

 return res.json();
};
