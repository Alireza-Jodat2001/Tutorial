'use client';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { setTokenCookies } from './signupActions';
import { signUpSchema } from '@/schema/signupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormValues } from '@/types/signup.type';

const loginServices = () => {
  const { register, formState, handleSubmit, watch } = useForm<SignUpFormValues>({ resolver: yupResolver(signUpSchema), mode: 'onChange' });
  const { password: passwordError, phone_number: phoneNumberError } = formState.errors;
  watch();

  // this is action login function
  const loginAction: any = async (FormData: FormData) => {
    const url = 'http://localhost:8080/auth/log-in';
    try {
      const { data } = await axios.post(url, FormData);
      await setTokenCookies(data);
      toast.success('Login successfully!');
      setTimeout(() => window.location.reload(), 1000);
    } catch {}
  };

  return { register, passwordError, phoneNumberError, handleSubmit, loginAction };
};

export default loginServices;
