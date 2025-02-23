'use server';

import { CallSignUpApiFunction, OnSubmitFunction, SetTokenCookiesFunction } from '@/types/signup.type';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// this function for set cookies (access_token & refresh_token)
export const setTokenCookies: SetTokenCookiesFunction = async ({ access_token, refresh_token }) => {
  (await cookies()).set('access_token', access_token);
  (await cookies()).set('refresh_token', refresh_token);
};

// this function for call signUp api
const callSignUpApi: CallSignUpApiFunction = async body => {
  const url = 'http://localhost:8080/auth/sign-up';
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch {}
};

// this function for handle submit
export const signUpAction: OnSubmitFunction = async values => {
  const data = await callSignUpApi(values);
  await setTokenCookies(data);
  redirect('/dashboard');
};
