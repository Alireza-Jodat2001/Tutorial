'use client';

import { useForm } from 'react-hook-form';
import { signUpSchema } from '@/schema/signupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormValues } from '@/types/signup.type';

const signUpServices = () => {
  const { register, formState, handleSubmit, watch } = useForm<SignUpFormValues>({ resolver: yupResolver(signUpSchema), mode: 'onChange' });
  const { password: passwordError, phone_number: phoneNumberError } = formState.errors;
  watch();

  return { register, passwordError, phoneNumberError, handleSubmit };
};

export default signUpServices;
