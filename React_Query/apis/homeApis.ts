import axios from 'axios';

export const getTodo = async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (id: number) => {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  try {
    await axios.delete(url);
  } catch (error) {
    throw error;
  }
};
