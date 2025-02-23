'use client';

import { fetchPosts } from '@/apis/graphQLClient';
import { FetchUsersProps, PaginationData, SelectType, User } from '@/types/componentBased.type';
import { FAKE_QUERY_KEY, FETCHING, IDEA, POSTS, QueryKeys, TODO } from '@/types/reactQuery.type';
import { Button } from '@material-tailwind/react';
import { keepPreviousData, queryOptions, skipToken, useInfiniteQuery, useIsFetching, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function page() {
  const groupOptions = (queryKey: QueryKeys) => queryOptions({ queryKey: [queryKey], queryFn: fetchPosts });
  const emptyGroupOptions = () => queryOptions({ queryKey: [FAKE_QUERY_KEY], queryFn: async () => [] });
  const queryClient = useQueryClient();

  // set query data
  function TestSetQueryData() {
    const { data } = useQuery({ ...groupOptions(IDEA), staleTime: 5 * 60 * 1000 });
    function handleClick() {
      setTimeout(() => {
        const newData = data?.map(item => ({ ...item, new: true }));
        queryClient.setQueryData(groupOptions(IDEA).queryKey, newData);
      }, 1000);
    }
    return <Button onClick={handleClick}>test set query data</Button>;
  }

  // network mode
  function TestNetworkMode() {
    const { isPending, isPaused, isFetching } = useQuery({ ...groupOptions(IDEA), refetchOnReconnect: true /* default */, networkMode: 'always' });
    return <div>Test Network Mode</div>;
  }

  // useQuery depended queries
  function TestUseQueryDependentQueries() {
    const { data: ideas } = useQuery(groupOptions(IDEA));
    const { data: posts } = useQuery({ ...groupOptions(POSTS), enabled: !!ideas?.length });
    console.log(posts);
    return <div>depended queries</div>;
  }

  // useQueries dependent queries
  function TestUseQueriesDependentQueries() {
    const { data: ideas } = useQuery(groupOptions(IDEA));
    const [posts, todo] = useQueries({ queries: !!ideas?.length ? [groupOptions(POSTS), groupOptions(TODO)] : [emptyGroupOptions(), emptyGroupOptions()] });
    console.log(posts);
    return <div>useQueries dependent queries</div>;
  }

  // best practice useQuery dependent queries
  function TestBestPracticeUseQueryDependentQueries() {
    async function fetchBoth() {
      try {
        const response1 = await Promise.resolve(5);
        const response2 = await Promise.resolve(2);
        return { response1, response2 };
      } catch {}
    }
    const { data } = useQuery({ queryKey: [IDEA], queryFn: fetchBoth });
    console.log(data);
    return <div>best practice useQuery dependent queries</div>;
  }

  // background refreshing /* with isFetching */
  function TestBackgroundRefreshing() {
    const { isFetching, status } = useQuery(groupOptions(IDEA));
    useEffect(() => {
      if (!!!isFetching) return;
      toast.info('Refreshing...');
    }, [isFetching]);
    console.log(status); /* success */
    return <div>background refreshing with isFetching</div>;
  }

  // useIsFetching /* background fetching */
  function TestUseIsFetching() {
    const isFetching = useIsFetching();
    useQuery(groupOptions(IDEA));
    useEffect(() => {
      if (!!!isFetching) return;
      toast.info('Refreshing...');
    }, [isFetching]);
    return <div>useIsFetching</div>;
  }

  // enabled = false
  function TestEnabledFalse() {
    const { data } = useQuery({ ...groupOptions(IDEA), enabled: false });
    console.log(data);
    return <div>enabled = false</div>;
  }

  // lazy query
  function TestLazyQuery() {
    const [enabled, setEnabled] = useState(false);
    const { data } = useQuery({ queryKey: [2], queryFn: async () => await Promise.resolve(5), enabled: false, initialData: null });
    console.log(data);
    return <Button onClick={() => setEnabled(true)}>click to execute fetch</Button>;
  }

  // skip token
  function TestSkipToken() {
    const [filter, setFilter] = useState<string | boolean>(false);
    const { data } = useQuery({ queryKey: ['todos', filter], queryFn: filter ? () => Promise.resolve(5) : skipToken });
    return <Button onClick={() => setFilter('ali')}>test skip token</Button>;
  }

  // retries query and delay retries
  function TestQueryRetriesAndDelayRetries() {
    const { data } = useQuery({ ...groupOptions(IDEA), retry: 10 /* false true (for custom logic (failureCount, error) => ...) */, retryDelay: 1 * 1000 });
    console.log(data);
    return <div>retries query and delay retries</div>;
  }

  // paginated queries
  function TestPaginatedQueries() {
    const [page, setPage] = useState(1);
    async function fetchUsers(page: number) {
      try {
        const { data } = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=10`);
        return data.data;
      } catch {
        throw new Error('Failed to fetch...');
      }
    }
    const { data, fetchStatus, status } = useQuery({
      queryKey: [POSTS, page],
      queryFn: () => fetchUsers(page),
      placeholderData: keepPreviousData,
      select: data => data.map(({ first_name, last_name, avatar }) => ({ first_name, last_name, avatar })),
    });
    return (
      <>
        paginated queries
        <Button onClick={() => setPage(page - 1)} loading={status === 'pending' && fetchStatus === FETCHING}>
          previous
        </Button>
        <Button onClick={() => setPage(page + 1)} loading={status === 'pending' && fetchStatus === FETCHING}>
          next
        </Button>
        <div className='flex flex-wrap gap-3'>
          {data.map(({ first_name, last_name, avatar }, index) => (
            <div key={index}>
              <img src={avatar} alt={`${first_name} ${last_name}`} /> {first_name} {last_name}
            </div>
          ))}
        </div>
      </>
    );
  }

  // useInfiniteQuery
  function TestUseInfiniteQuery() {
    async function fetchUsers({ pageParam }: FetchUsersProps) {
      try {
        const { data } = await axios.get<PaginationData>(`https://reqres.in/api/users?page=${pageParam}&per_page=2`);
        return data;
      } catch {
        throw new Error('Failed to fetch...');
      }
    }
    const { data, fetchNextPage } = useInfiniteQuery<User[], string, User[], PaginationData>({
      queryKey: [IDEA],
      queryFn: fetchUsers,
      initialPageParam: 1,
      select: (data: SelectType): User[] => data.pages.flatMap(({ data }) => data.map(({ first_name, avatar, last_name }) => ({ first_name, avatar, last_name }))),
      getNextPageParam: ({ page, total_pages }: PaginationData) => (page + 1 <= total_pages ? page + 1 : undefined),
    });
    return (
      <>
        use infinite queries
        <Button onClick={() => fetchNextPage()}>next</Button>
        <div className='flex flex-wrap gap-3'>
          {(data as User[]).map(({ first_name, last_name, avatar }, index) => (
            <div key={index}>
              <img src={avatar} alt={`${first_name} ${last_name}`} /> {first_name} {last_name}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div>
      {/* <TestSetQueryData /> */}
      {/* <TestNetworkMode /> */}
      {/* <TestUseQueryDependentQueries /> */}
      {/* <TestUseQueriesDependentQueries /> */}
      {/* <TestBestPracticeUseQueryDependentQueries /> */}
      {/* <TestUseIsFetching /> */}
      {/* <TestBackgroundRefreshing /> */}
      {/* <TestEnabledFalse /> */}
      {/* <TestLazyQuery /> */}
      {/* <TestSkipToken /> */}
      {/* <TestQueryRetriesAndDelayRetries /> */}
      {/* <TestPaginatedQueries /> */}
      <TestUseInfiniteQuery />
    </div>
  );
}
