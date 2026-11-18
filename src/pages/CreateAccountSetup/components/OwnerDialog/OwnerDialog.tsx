import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { type FormEvent, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DateOfBirthField } from '../DateOfBirthField/DateOfBirthField.tsx';
import { FormGrid, FormGridFullRow } from '../FormGrid/FormGrid.tsx';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { SsnField } from '../SsnField/SsnField.tsx';
import { StateSelect } from '../StateSelect/StateSelect.tsx';
import { OWNER_FIELDS } from './fields.ts';
import { type Owner, ownerSchema } from './validation.ts';

type Props = {
  onCancel: () => void;
  // Runs once the dialog has finished closing.
  onClosed: () => void;
  onSave: (owner: Owner) => void;
  open: boolean;
  // null when adding a new owner.
  owner: Owner | null;
  // The % nobody else owns, leaving out the owner being edited.
  remaining: number;
};

const TITLE_ID = 'owner-dialog-title';

// Adds or edits one beneficial owner in its own small form; the screen keeps the list.
export const OwnerDialog = ({
  onCancel,
  onClosed,
  onSave,
  open,
  owner,
  remaining,
}: Props) => {
  const form = useForm<Owner>({
    context: { remaining },
    defaultValues: owner ?? ownerSchema.getDefault(),
    mode: 'onTouched',
    resolver: yupResolver(ownerSchema),
  });
  const { handleSubmit, reset } = form;

  // The dialog renders inside the wizard's form through a portal, and React events bubble
  // through portals, so its submit must not reach the wizard and trigger Next.
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    void handleSubmit((values) => {
      onSave({ ...values, id: values.id || crypto.randomUUID() });
    })(event);
  };

  useEffect(() => {
    if (open) {
      reset(owner ?? ownerSchema.getDefault());
    }
  }, [open, owner, reset]);

  return (
    <Dialog
      aria-labelledby={TITLE_ID}
      fullWidth
      maxWidth='md'
      onClose={onCancel}
      open={open}
      slotProps={{ transition: { onExited: onClosed } }}
    >
      <FormProvider {...form}>
        <form noValidate onSubmit={handleFormSubmit}>
          <DialogTitle id={TITLE_ID}>
            {owner ? 'Edit owner' : 'Add owner'}
          </DialogTitle>
          <DialogContent>
            <FormGrid>
              <FormTextField
                autoComplete='off'
                label='First name'
                name={OWNER_FIELDS.firstName}
              />
              <FormTextField
                autoComplete='off'
                label='Last name'
                name={OWNER_FIELDS.lastName}
              />
              <FormTextField
                autoComplete='off'
                label='Job title'
                name={OWNER_FIELDS.jobTitle}
              />
              <FormTextField
                autoComplete='off'
                label='Bar Card number'
                name={OWNER_FIELDS.barNumber}
              />
              <DateOfBirthField name={OWNER_FIELDS.dateOfBirth} />
              <FormTextField
                autoComplete='off'
                label='Ownership (%)'
                name={OWNER_FIELDS.ownership}
                slotProps={{ htmlInput: { inputMode: 'numeric' } }}
              />
              <SsnField name={OWNER_FIELDS.ssn} />
              <FormGridFullRow>
                <FormTextField
                  autoComplete='off'
                  label='Home address'
                  name={OWNER_FIELDS.homeAddress1}
                />
              </FormGridFullRow>
              <FormTextField
                autoComplete='off'
                label='Address 2 (optional)'
                name={OWNER_FIELDS.homeAddress2}
              />
              <FormTextField
                autoComplete='off'
                label='City'
                name={OWNER_FIELDS.homeCity}
              />
              <StateSelect
                autoComplete='off'
                label='State'
                name={OWNER_FIELDS.homeState}
              />
              <FormTextField
                autoComplete='off'
                label='ZIP code'
                name={OWNER_FIELDS.homeZip}
                slotProps={{ htmlInput: { inputMode: 'numeric' } }}
              />
            </FormGrid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type='submit' variant='contained'>
              Save
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
