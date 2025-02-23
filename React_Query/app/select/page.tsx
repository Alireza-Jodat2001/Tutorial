'use client';

import { useQuery, queryOptions, useQueryClient } from '@tanstack/react-query';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type QueryKey = ['todo' | 'posts' | 'ideas'];

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: string;
    mutationKey: QueryKey;
    // queryKey: QueryKey;
  }
}

const page = () => {
  const { push } = useRouter();
  const fetchPosts = async () => {
    try {
      return await axios.get('https://jsonplaceholder.typicode.com/todos');
    } catch (error) {
      if (axios.isAxiosError(error)) throw new Error(error.message);
    }
  };

  const groupOptions = () => queryOptions({ queryKey: ['todo'], queryFn: fetchPosts, select: response => response?.data, staleTime: 5 * 1000 });

  const queryClient = useQueryClient();
  const { data } = useQuery(groupOptions());

  const handleNavigate = async () => {
    queryClient.prefetchQuery(groupOptions());
    push('/select');
  };

  const cashedData = queryClient.getQueryData<string[]>(['todo']);
  console.log(cashedData?.data);

  return (
    <div>
      {/* @ts-ignore */}
      <Button onClick={handleNavigate}>Prefetch Query</Button>
    </div>
  );
};

export default page;
