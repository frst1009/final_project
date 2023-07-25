import { object, string, ref } from 'yup';

export const signUpValidations = object({
  username: string().min(2).max(50).required(),
  email: string().email().required(),
  password: string().required().min(5),
  confirmPassword: string().oneOf([ref('password')]).required(),
});

export const changePasswordValidations = object({
  password: string().required().min(5),
  confirmPassword: string().oneOf([ref('password')]).required(),
});

export const signInValidations = object({
  email: string().email().required(),
  password: string().required().min(5),
});
