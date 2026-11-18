import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { PATHS } from '../../../../../../routes/paths.ts';
import { OwnerDialog } from '../../../../components/OwnerDialog/OwnerDialog.tsx';
import type { Owner } from '../../../../components/OwnerDialog/validation.ts';
import { RemoveOwnerDialog } from '../../../../components/RemoveOwnerDialog/RemoveOwnerDialog.tsx';
import { DWOLLA_FIELDS } from '../fields.ts';
import styles from './DwollaOwnersScreen.module.css';

type OwnersError = { message?: string; root?: { message?: string } };

type Row = {
  dateOfBirth: string;
  id: string;
  name: string;
  owner: Owner | null;
  ownership: number;
  title: string;
};

const formatDate = (date: Dayjs | null) => date?.format('MM/DD/YYYY') ?? '';

const fullName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`.trim();

export const DwollaOwnersScreen = () => {
  const navigate = useNavigate();
  const wide = useMediaQuery('(min-width: 600px)');
  const {
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext();
  const { append, remove, update } = useFieldArray({
    control,
    keyName: 'key',
    name: DWOLLA_FIELDS.owners,
  });
  const [firstName, lastName, dateOfBirth, jobTitle, ownership] = useWatch({
    control,
    name: [
      DWOLLA_FIELDS.firstName,
      DWOLLA_FIELDS.lastName,
      DWOLLA_FIELDS.dateOfBirth,
      DWOLLA_FIELDS.jobTitle,
      DWOLLA_FIELDS.ownership,
    ],
  }) as [string, string, Dayjs | null, string, string];
  // Read the values, not useFieldArray's fields, so RHF's own row key never reaches the dialog.
  const owners = useWatch({ control, name: DWOLLA_FIELDS.owners }) as Owner[];
  const [dialogOwner, setDialogOwner] = useState<Owner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [removing, setRemoving] = useState<Owner | null>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLTableElement & HTMLUListElement>(null);

  const rows: Row[] = [
    {
      dateOfBirth: formatDate(dateOfBirth),
      id: 'you',
      name: fullName(firstName, lastName),
      owner: null,
      ownership: Number(ownership),
      title: jobTitle,
    },
    ...owners.map((owner) => ({
      dateOfBirth: formatDate(owner.dateOfBirth ?? null),
      id: owner.id,
      name: fullName(owner.firstName, owner.lastName),
      owner,
      ownership: Number(owner.ownership),
      title: owner.jobTitle,
    })),
  ];
  const total = rows.reduce((sum, row) => sum + row.ownership, 0);
  const remaining =
    100 - total + (dialogOwner ? Number(dialogOwner.ownership) : 0);
  const ownersError = errors[DWOLLA_FIELDS.owners] as OwnersError | undefined;
  const totalError = ownersError?.message ?? ownersError?.root?.message;

  const actions = (row: Row) => (
    <div className={styles.actions}>
      <Button
        aria-label={row.owner ? `Edit ${row.name}` : 'Edit your details'}
        onClick={() => handleEdit(row.owner)}
        size='small'
      >
        Edit
      </Button>
      {row.owner && (
        <Button
          aria-label={`Remove ${row.name}`}
          color='error'
          onClick={() => setRemoving(row.owner)}
          size='small'
        >
          Remove
        </Button>
      )}
    </div>
  );

  const handleAdd = () => {
    setDialogOwner(null);
    setIsDialogOpen(true);
  };

  // A dialog gives focus back to the button that opened it. Removing an owner, or a save that
  // hides Add owner, takes that button away, so focus goes to Add owner or the list instead of
  // falling back to the top of the page.
  const handleDialogClosed = () => {
    if (document.activeElement === document.body) {
      (addRef.current ?? listRef.current)?.focus();
    }
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSave = (owner: Owner) => {
    const index = owners.findIndex(({ id }) => id === owner.id);

    if (index === -1) {
      append(owner);
    } else {
      update(index, owner);
    }

    setIsDialogOpen(false);
  };

  const handleEdit = (owner: Owner | null) => {
    if (!owner) {
      void navigate(PATHS.setupDwollaAbout);
      return;
    }

    setDialogOwner(owner);
    setIsDialogOpen(true);
  };

  const handleRemoveCancel = () => {
    setRemoving(null);
  };

  const handleRemoveConfirm = () => {
    remove(owners.findIndex(({ id }) => id === removing?.id));
    setRemoving(null);
  };

  // A total error from an earlier Next may be out of date once the applicant changes their % in
  // About you, so it's cleared on arrival; Next checks the total again.
  useEffect(() => {
    clearErrors(DWOLLA_FIELDS.owners);
  }, [clearErrors]);

  useEffect(() => {
    if (totalError) {
      alertRef.current?.focus();
    }
  }, [totalError]);

  return (
    <div className={styles.screen}>
      <Typography component='p'>
        List everyone who owns 25% or more of the firm.
      </Typography>
      {totalError && (
        <Alert ref={alertRef} severity='error' tabIndex={-1}>
          {totalError}
        </Alert>
      )}
      {wide ? (
        <Table aria-label='Beneficial owners' ref={listRef} tabIndex={-1}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Ownership</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.dateOfBirth}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{`${row.ownership}%`}</TableCell>
                <TableCell>{actions(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <ul
          aria-label='Beneficial owners'
          className={styles.cards}
          ref={listRef}
          tabIndex={-1}
        >
          {rows.map((row) => (
            <li className={styles.card} key={row.id}>
              <Typography component='p' variant='subtitle1'>
                {row.name}
              </Typography>
              <Typography component='p' variant='body2'>
                {row.dateOfBirth}
              </Typography>
              <Typography component='p' variant='body2'>
                {`Title: ${row.title}`}
              </Typography>
              <Typography component='p' variant='body2'>
                {`${row.ownership}%`}
              </Typography>
              {actions(row)}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.footer}>
        <Typography component='p'>{`Total: ${total}%`}</Typography>
        {total < 100 && (
          <Button onClick={handleAdd} ref={addRef} variant='outlined'>
            Add owner
          </Button>
        )}
      </div>
      <OwnerDialog
        onCancel={handleDialogCancel}
        onClosed={handleDialogClosed}
        onSave={handleDialogSave}
        open={isDialogOpen}
        owner={dialogOwner}
        remaining={remaining}
      />
      <RemoveOwnerDialog
        name={removing ? fullName(removing.firstName, removing.lastName) : ''}
        onCancel={handleRemoveCancel}
        onClosed={handleDialogClosed}
        onConfirm={handleRemoveConfirm}
        open={!!removing}
      />
    </div>
  );
};
