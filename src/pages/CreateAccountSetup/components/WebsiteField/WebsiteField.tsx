import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { normalizeWebsite } from './normalizeWebsite.ts';

type Props = { name: string };

export const WebsiteField = ({ name }: Props) => (
  <FormTextField
    autoComplete='url'
    label='Website (optional)'
    name={name}
    normalize={normalizeWebsite}
  />
);
