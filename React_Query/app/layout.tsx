import type { Metadata } from 'next';
import '@/styles/globals.css';
import { RootLayoutProps } from '@/types/rootLayout.type';
import CustomRootLayout from '@/components/RootLayout';

export const metadata: Metadata = {
  title: 'React Query',
  description: '',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return <CustomRootLayout>{children}</CustomRootLayout>;
};

export default RootLayout;
