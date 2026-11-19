import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { PATHS } from '../../../../../../routes/paths.ts';
import type { Owner } from '../../../../components/owners/OwnerDialog/validation.ts';
import { OwnersList } from '../../../../components/owners/OwnersList/OwnersList.tsx';
import { USIO_FIELDS } from '../fields.ts';
import type { UsioValues } from '../validation.ts';

// Usio's Beneficial owners: its own form's owners, shown and edited by the shared OwnersList.
export const UsioOwnersScreen = () => {
  const navigate = useNavigate();
  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
  } = useFormContext<UsioValues>();
  const { append, remove, update } = useFieldArray({
    control,
    keyName: 'key',
    name: USIO_FIELDS.owners,
  });
  // Watched, not read with getValues: right after an add or remove, getValues still returns the
  // old list for one render, so the removed row would linger and steal focus.
  const owners = useWatch({ control, name: USIO_FIELDS.owners });

  const totalError =
    errors[USIO_FIELDS.owners]?.message ??
    errors[USIO_FIELDS.owners]?.root?.message;

  const handleEditApplicant = () => {
    void navigate(PATHS.setupUsioAbout);
  };

  const handleRemove = (id: string) => {
    remove(owners.findIndex((owner) => owner.id === id));
  };

  const handleSave = (owner: Owner) => {
    const index = owners.findIndex(({ id }) => id === owner.id);

    if (index === -1) {
      append(owner);
    } else {
      update(index, owner);
    }
  };

  // A total error from an earlier Next may be out of date once the applicant changes their % in
  // About you, so it's cleared on arrival; Next checks the total again.
  useEffect(() => {
    clearErrors(USIO_FIELDS.owners);
  }, [clearErrors]);

  return (
    <OwnersList
      applicant={getValues()}
      onEditApplicant={handleEditApplicant}
      onRemove={handleRemove}
      onSave={handleSave}
      owners={owners}
      totalError={totalError}
    />
  );
};
