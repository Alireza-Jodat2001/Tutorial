'use client';

import { fetchPosts } from '@/apis/graphQLClient';
import { QueryKeys } from '@/types/reactQuery.type';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function page() {
  const { IDEA } = QueryKeys;
  //   const GroupOptions = () => queryOptions({ queryKey: [IDEA], queryFn: fetchPosts });
  //   const { data } = useQuery(GroupOptions());

  function Posts() {
    const { IDEA } = QueryKeys;
    // const GroupOptions = () => queryOptions({ queryKey: [IDEA], queryFn: fetchPosts });
    const { data } = useSuspenseQuery({ queryKey: ['idea'], queryFn: fetchPosts });
    return (
      <div className='grid grid-cols-2'>
        {data?.map(({ title }, index) => (
          <div className='bg-white rounded-sm' key={index}>
            {title}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      Query Options
      <Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </Suspense>
    </div>
  );
}
