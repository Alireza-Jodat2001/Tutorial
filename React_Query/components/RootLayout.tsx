'use client';

import { RootLayoutProps } from '@/types/rootLayout.type';
import CustomQueryClientProvider from './QueryClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

const CustomRootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en' dir='ltr'>
      <body className='bg-cyan-900'>
        <CustomQueryClientProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </CustomQueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
};

export default CustomRootLayout;
