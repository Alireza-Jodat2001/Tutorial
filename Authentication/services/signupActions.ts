'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CallSignUpApiFunction, SetTokenCookiesFunction, SignUpFormValues } from '@/types/signup.type';

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
export const signUpAction = async (values: SignUpFormValues) => {
  const data = await callSignUpApi(values);
  setTokenCookies(data);
  redirect('/dashboard');
};
