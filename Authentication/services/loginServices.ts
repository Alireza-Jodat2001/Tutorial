'use client';

import { OnSubmitFunction, SignUpFormValues } from '@/types/signup.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/schema/signupSchema';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setTokenCookies } from './signupActions';
import { toast } from 'react-toastify';

const loginServices = () => {
  const { register, formState, handleSubmit, watch } = useForm<SignUpFormValues>({ resolver: yupResolver(signUpSchema), mode: 'onChange' });
  const { password: passwordError, phone_number: phoneNumberError } = formState.errors;
  watch();

  // this is action login function
  const loginAction: OnSubmitFunction = async body => {
    const url = 'http://localhost:8080/auth/log-in';
    try {
      const { data } = await axios.post(url, body);
      await setTokenCookies(data);
      toast.success('Login successfully!');
      setTimeout(() => window.location.reload(), 1000);
    } catch {}
  };

  return { register, passwordError, phoneNumberError, handleSubmit, loginAction };
};

export default loginServices;
