import * as y from 'yup';

export const signUpSchema = y.object({
  phone_number: y.string().required('phone number is required!').strict(true),
  password: y.string().required('password is required!').strict(true),
});
