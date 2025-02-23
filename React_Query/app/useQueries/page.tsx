'use client';

import { fetchPosts } from '@/apis/graphQLClient';
import { QueryKeys } from '@/types/reactQuery.type';
import { useQueries, queryOptions, QueryClient, useQuery } from '@tanstack/react-query';

export default function page() {
  const { IDEA, POSTS } = QueryKeys;
  const groupOptions = (queryKey: QueryKeys) => queryOptions({ queryKey: [queryKey], queryFn: fetchPosts });

  const [{ data: postsData }, { data: ideaData }] = useQueries({ queries: [groupOptions(POSTS), groupOptions(IDEA)] });

  async function testPrefetchQuery() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(groupOptions(POSTS));
    const { data } = useQuery(groupOptions(POSTS));
    console.log(data);
  }

  console.log(postsData);

  return <div>useQueries</div>;
}
