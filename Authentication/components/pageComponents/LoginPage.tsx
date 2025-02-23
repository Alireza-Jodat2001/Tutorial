'use client';

import loginServices from '@/services/loginServices';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';

const LoginPage = () => {
  const { register, passwordError, phoneNumberError, handleSubmit, loginAction } = loginServices();

  return (
    <Card color='transparent' shadow={true} className='w-fit p-7'>
      <Typography variant='h4' color='blue-gray'>
        Login
      </Typography>

      <Typography color='gray' className='mt-1 font-normal'>
        Nice to meet you! Enter your details to register.
      </Typography>

      <form action={handleSubmit(loginAction) as any} className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
        <div className='mb-1 flex flex-col gap-6'>
          <div>
            <Typography variant='h6' color='blue-gray' className='mb-3'>
              Phone Number
            </Typography>

            <Input
              size='lg'
              type='tel'
              placeholder='09359227339'
              className={`${phoneNumberError ? '!border-[red] focus:!border-[red]' : '!border-t-blue-gray-200 focus:!border-t-gray-900'}`}
              crossOrigin={undefined}
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              {...register('phone_number')}
            />
            {phoneNumberError && <p className='text-[red]'>{phoneNumberError.message}</p>}
          </div>

          <Typography variant='h6' color='blue-gray' className='-mb-3'>
            Password
          </Typography>

          <div>
            <Input
              size='lg'
              type='password'
              placeholder='********'
              className={`${passwordError ? '!border-[red] focus:!border-[red]' : '!border-t-blue-gray-200 focus:!border-t-gray-900'}`}
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
              {...register('password')}
            />
            {passwordError && <p className='text-[red]'>{passwordError.message}</p>}
          </div>
        </div>

        <Button type='submit' className='mt-6' fullWidth>
          Login
        </Button>

        <Typography color='gray' className='mt-4 text-center font-normal'>
          Already don't have an account?
          <Link href='/auth/signup' className='font-medium text-gray-900'>
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default LoginPage;
