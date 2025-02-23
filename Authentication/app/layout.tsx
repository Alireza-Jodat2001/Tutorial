import type { Metadata } from 'next';
import '@/styles/globals.css';
import { RootLayoutProps } from '@/types/rootLayout.type';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Authentication',
  description: '',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en' dir='ltr'>
      <body className='flex items-center justify-center min-h-screen'>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
