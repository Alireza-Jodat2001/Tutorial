'use client';

import { PostCards } from '@/components/PostCards';
import { getTodo } from '@/apis/homeApis';
import { Spinner } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { isPending, isError, data } = useQuery({ queryKey: ['todo'], queryFn: getTodo });

  if (isPending)
    return (
      <div className='flex items-center justify-center h-screen'>
        {/* @ts-ignore */}
        <Spinner className='h-10 w-10' />
      </div>
    );

  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className='grid grid-cols-2 gap-x-12 w-[90%] mx-auto'>
      {/* @ts-ignore */}
      {data.map(({ title, userId, id }, index) => (
        <PostCards title={title} key={index} userId={userId} id={id} />
      ))}
    </div>
  );
};

export default Home;
