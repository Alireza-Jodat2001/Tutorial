'use client';

import { deleteTodo } from '@/apis/homeApis';
import { PostCardsProps } from '@/types/postCards.type';
import { Card, CardBody, Typography, CardFooter, Button } from '@material-tailwind/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export function PostCards({ userId, title, id }: PostCardsProps) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({ mutationFn: deleteTodo, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todo'] }) });

  return (
    <Card className='mt-6 w-full'>
      <CardBody>
        <Typography variant='h5' color='blue-gray' className='mb-2'>
          {userId}
        </Typography>

        <Typography>{title}</Typography>
      </CardBody>

      <CardFooter>
        <Button onClick={() => mutate(id)} loading={isPending}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
