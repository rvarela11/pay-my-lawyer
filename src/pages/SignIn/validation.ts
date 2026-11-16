import { type InferType, object, string } from 'yup';
import { FIELDS } from './fields.ts';

export const signInSchema = object({
  [FIELDS.email]: string()
    .trim()
    .default('')
    .required('Email is required')
    .email('Enter a valid email'),
  [FIELDS.password]: string().default('').required('Password is required'),
});

export type SignInValues = InferType<typeof signInSchema>;
