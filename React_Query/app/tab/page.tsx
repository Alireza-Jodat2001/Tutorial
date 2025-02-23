'use client';

import { fetchPosts } from '@/apis/graphQLClient';
import { FetchStatuses, QueryKeys } from '@/types/reactQuery.type';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function TabsPage() {
  const { IDEA, POSTS, TODO } = QueryKeys;
  const { FETCHING, IDLE, PAUSED } = FetchStatuses;
  const [activeTab, setActiveTab] = useState<QueryKeys>(POSTS);

  const fakeData = [
    {
      label: 'Posts',
      value: POSTS,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: 'Ideas',
      value: IDEA,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
  ];

  const { data, fetchStatus, isPending } = useQuery({
    queryKey: [activeTab, 1, { page: 1 }],
    queryFn: async ({ queryKey, client, signal, pageParam }) => {
      // console.log(queryKey);
      // console.log(client);
      // console.log(signal);
      // console.log(pageParam);
      const data = await fetchPosts();
      return { data, key: queryKey[0] };
    },
  });

  const fetchFunction = ({
    queryKey,
    client,
    signal,
    meta,
  }: {
    queryKey: QueryKeys;
    client: QueryClient;
    signal?: AbortSignal;
    meta: Record<string, unknown> | undefined;
  }) => {
    console.log(queryKey);
    return new Promise();
  };

  const response = useQuery({
    queryKey: [TODO],
    queryFn: fetchFunction,
  });

  return (
    <Tabs value={POSTS}>
      <TabsHeader>
        {fakeData.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {fakeData.map(({ value, desc }) =>
          fetchStatus === FETCHING && isPending ? (
            <div key={value}>Loading...</div>
          ) : (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          )
        )}
      </TabsBody>
    </Tabs>
  );
}
