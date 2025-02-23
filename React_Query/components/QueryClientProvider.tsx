import { CustomQueryClientProviderProps } from '@/types/reactQuery.type';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // 👈 این مقدار را تنظیم کن
    },
  },
});

const CustomQueryClientProvider = ({ children }: CustomQueryClientProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default CustomQueryClientProvider;
