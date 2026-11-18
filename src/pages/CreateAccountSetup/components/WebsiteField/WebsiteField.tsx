import type { FieldPath } from 'react-hook-form';
import type { SetupValues } from '../../validation.ts';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { normalizeWebsite } from './normalizeWebsite.ts';

type Props = { name: FieldPath<SetupValues> };

export const WebsiteField = ({ name }: Props) => (
  <FormTextField
    autoComplete='url'
    label='Website (optional)'
    name={name}
    normalize={normalizeWebsite}
  />
);
