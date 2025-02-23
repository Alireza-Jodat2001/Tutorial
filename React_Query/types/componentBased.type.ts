export interface FetchUsersProps {
  pageParam: number;
}

export interface User {
  id?: number;
  email?: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface PaginationData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export interface SelectType {
  pages: PaginationData[];
  pageParams: number[];
}
