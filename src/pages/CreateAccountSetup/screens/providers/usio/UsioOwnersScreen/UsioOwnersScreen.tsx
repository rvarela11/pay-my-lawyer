import { useFormContext, useWatch } from 'react-hook-form';
import { OwnersList } from '../../../../components/OwnersList/OwnersList.tsx';
import { USIO_FIELDS } from '../fields.ts';
import type { UsioValues } from '../validation.ts';

// Usio's Beneficial owners: its own form's owners, shown by the shared OwnersList.
export const UsioOwnersScreen = () => {
  const { control, getValues } = useFormContext<UsioValues>();
  const owners = useWatch({ control, name: USIO_FIELDS.owners });

  return <OwnersList applicant={getValues()} owners={owners} />;
};
