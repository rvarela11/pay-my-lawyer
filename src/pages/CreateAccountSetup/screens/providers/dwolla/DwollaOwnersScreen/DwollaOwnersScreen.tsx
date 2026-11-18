import Add from '@mui/icons-material/Add';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import {
  Alert,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
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
  barNumber: string;
  dateOfBirth: string;
  id: string;
  name: string;
  owner: Owner | null;
  ownership: number;
  title: string;
};

// Shown for a blank Bar Card number.
const DASH = '—';

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
  const [firstName, lastName, barNumber, dateOfBirth, jobTitle, ownership] =
    useWatch({
      control,
      name: [
        DWOLLA_FIELDS.firstName,
        DWOLLA_FIELDS.lastName,
        DWOLLA_FIELDS.barNumber,
        DWOLLA_FIELDS.dateOfBirth,
        DWOLLA_FIELDS.jobTitle,
        DWOLLA_FIELDS.ownership,
      ],
    }) as [string, string, string, Dayjs | null, string, string];
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
      barNumber: barNumber || DASH,
      dateOfBirth: formatDate(dateOfBirth),
      id: 'you',
      name: fullName(firstName, lastName),
      owner: null,
      ownership: Number(ownership),
      title: jobTitle,
    },
    ...owners.map((owner) => ({
      barNumber: owner.barNumber || DASH,
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

  // Icon buttons keep every row one line high; the tooltip shows each button's name.
  const actions = (row: Row) => {
    const editLabel = row.owner ? `Edit ${row.name}` : 'Edit your details';
    const removeLabel = `Remove ${row.name}`;

    return (
      <div className={styles.actions}>
        <Tooltip title={editLabel}>
          <IconButton
            aria-label={editLabel}
            onClick={() => handleEdit(row.owner)}
          >
            <EditOutlined />
          </IconButton>
        </Tooltip>
        {row.owner && (
          <Tooltip title={removeLabel}>
            <IconButton
              aria-label={removeLabel}
              onClick={() => setRemoving(row.owner)}
            >
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  };

  // One label/value pair in a card: muted label, ink value, lined up in two columns.
  const detail = (
    label: string,
    value: string,
    variant: 'body2' | 'subtitle2' = 'body2',
  ) => (
    <>
      <Typography className={styles.term} component='dt' variant={variant}>
        {label}
      </Typography>
      <Typography className={styles.value} component='dd' variant={variant}>
        {value}
      </Typography>
    </>
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
      {totalError && (
        <Alert ref={alertRef} severity='error' tabIndex={-1}>
          {totalError}
        </Alert>
      )}
      {/* Top right, above the list, where it stays in view however many owners there are. */}
      {total < 100 && (
        <div className={styles.toolbar}>
          <Button onClick={handleAdd} ref={addRef} startIcon={<Add />}>
            Add owner
          </Button>
        </div>
      )}
      {wide ? (
        <Table
          aria-label='Beneficial owners'
          ref={listRef}
          size='small'
          tabIndex={-1}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell className={styles.nowrap}>Bar Card #</TableCell>
              <TableCell className={styles.nowrap}>
                <abbr className={styles.abbr} title='Date of birth'>
                  DOB
                </abbr>
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Ownership</TableCell>
              <TableCell>
                <span className={styles.visuallyHidden}>Actions</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell className={styles.nowrap}>{row.barNumber}</TableCell>
                <TableCell className={styles.nowrap}>
                  {row.dateOfBirth}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell align='right' className={styles.number}>
                  {`${row.ownership}%`}
                </TableCell>
                <TableCell>{actions(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* The total sits under the Ownership column it adds up. */}
          <TableFooter>
            <TableRow>
              <TableCell className={styles.total} colSpan={4}>
                <Typography component='span' variant='subtitle2'>
                  Total
                </Typography>
              </TableCell>
              <TableCell
                align='right'
                className={`${styles.number} ${styles.total}`}
              >
                <Typography component='span' variant='subtitle2'>
                  {`${total}%`}
                </Typography>
              </TableCell>
              <TableCell className={styles.total} />
            </TableRow>
          </TableFooter>
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
              <div className={styles.cardHeader}>
                <Typography component='p' variant='subtitle1'>
                  {row.name}
                </Typography>
                {actions(row)}
              </div>
              <dl className={styles.details}>
                {detail('Ownership', `${row.ownership}%`)}
                {detail('Bar Card #', row.barNumber)}
                {detail('DOB', row.dateOfBirth)}
                {detail('Title', row.title)}
              </dl>
            </li>
          ))}
        </ul>
      )}
      {!wide && (
        <dl className={styles.details}>
          {detail('Total ownership', `${total}%`, 'subtitle2')}
        </dl>
      )}
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
