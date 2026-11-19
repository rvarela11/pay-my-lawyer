import { useFormContext, useWatch } from 'react-hook-form';
import { OwnersList } from '../../../../components/OwnersList/OwnersList.tsx';
import { DWOLLA_FIELDS } from '../fields.ts';
import type { DwollaValues } from '../validation.ts';

// Dwolla's Beneficial owners: its own form's owners, shown by the shared OwnersList.
export const DwollaOwnersScreen = () => {
  const { control, getValues } = useFormContext<DwollaValues>();
  const owners = useWatch({ control, name: DWOLLA_FIELDS.owners });

  return <OwnersList applicant={getValues()} owners={owners} />;
};
