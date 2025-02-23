import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchPosts(): Promise<Todo[]> {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
  } catch (error) {
    throw new Error("could'nt fetch data!");
  }
}
