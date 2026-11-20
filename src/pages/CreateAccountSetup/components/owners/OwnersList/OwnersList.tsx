import Add from '@mui/icons-material/Add';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { OwnerDialog } from '../OwnerDialog/OwnerDialog.tsx';
import type { Owner } from '../OwnerDialog/validation.ts';
import { RemoveOwnerDialog } from '../RemoveOwnerDialog/RemoveOwnerDialog.tsx';
import { useOwnerDialog } from './hooks/useOwnerDialog.ts';
import { useRemoveOwnerDialog } from './hooks/useRemoveOwnerDialog.ts';
import { OwnerCard } from './OwnerCard/OwnerCard.tsx';
import { OWNER_LABELS } from './ownerLabels.ts';
import { OwnershipBar } from './OwnershipBar/OwnershipBar.tsx';
import styles from './OwnersList.module.css';
import {
  type Applicant,
  fullName,
  type OwnerRow,
  toOwnerRows,
  totalOwnership,
} from './toOwnerRows.ts';

type Props = {
  applicant: Applicant;
  onEditApplicant: () => void;
  onRemove: (id: string) => void;
  onSave: (owner: Owner) => void;
  owners: Owner[];
  // The total-over-100% error from Next, if any.
  totalError?: string;
};

// The Beneficial owners list every provider shows: a card for the applicant and each owner,
// the total, and the Add/Edit and Remove dialogs. The provider's
// screen owns the form and saves what this list hands back.
export const OwnersList = ({
  applicant,
  onEditApplicant,
  onRemove,
  onSave,
  owners,
  totalError,
}: Props) => {
  const addRef = useRef<HTMLButtonElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const rows = toOwnerRows(applicant, owners);
  const total = totalOwnership(rows);
  const ownerDialog = useOwnerDialog({ onSave, total });
  const removeDialog = useRemoveOwnerDialog({ onRemove });

  // A dialog gives focus back to the button that opened it. Removing an owner, or a save that
  // hides Add owner, takes that button away, so focus goes to Add owner or the list instead of
  // falling back to the top of the page.
  const handleDialogClosed = () => {
    if (document.activeElement === document.body) {
      (addRef.current ?? listRef.current)?.focus();
    }
  };

  const handleEdit = (row: OwnerRow) => {
    if (row.owner) {
      ownerDialog.openEdit(row.owner);
    } else {
      onEditApplicant();
    }
  };

  const handleRemove = (row: OwnerRow) => {
    if (row.owner) {
      removeDialog.ask(row.owner);
    }
  };

  useEffect(() => {
    if (totalError) {
      alertRef.current?.focus();
    }
  }, [totalError]);

  return (
    <Stack spacing={1.5} useFlexGap>
      {totalError && (
        <Alert ref={alertRef} severity='error' tabIndex={-1}>
          {totalError}
        </Alert>
      )}
      {/* Top right, above the list, where it stays in view however many owners there are. */}
      {total < 100 && (
        <Stack className={styles.toolbar} direction='row'>
          <Button
            onClick={ownerDialog.openAdd}
            ref={addRef}
            startIcon={<Add />}
          >
            Add owner
          </Button>
        </Stack>
      )}
      <Stack
        aria-label={OWNER_LABELS.list}
        component='ul'
        ref={listRef}
        role='list'
        spacing={1.5}
        tabIndex={-1}
        useFlexGap
      >
        {rows.map((row) => (
          <OwnerCard
            key={row.id}
            onEdit={handleEdit}
            onRemove={handleRemove}
            row={row}
          />
        ))}
      </Stack>
      {/* The sum, under the cards' percentages. The bar above it shows how much is assigned. */}
      <Stack spacing={1} useFlexGap>
        <OwnershipBar track value={total} />
        <Stack className={styles.total} component='dl' direction='row'>
          <Typography component='dt' variant='subtitle2'>
            {OWNER_LABELS.total}
          </Typography>
          <Typography className={styles.sum} component='dd' variant='subtitle2'>
            {`${total}%`}
          </Typography>
        </Stack>
      </Stack>
      <OwnerDialog
        onCancel={ownerDialog.close}
        onClosed={handleDialogClosed}
        onSave={ownerDialog.save}
        open={ownerDialog.isOpen}
        owner={ownerDialog.owner}
        remaining={ownerDialog.remaining}
      />
      <RemoveOwnerDialog
        name={
          removeDialog.owner
            ? fullName(
                removeDialog.owner.firstName,
                removeDialog.owner.lastName,
              )
            : ''
        }
        onCancel={removeDialog.cancel}
        onClosed={handleDialogClosed}
        onConfirm={removeDialog.confirm}
        open={removeDialog.isOpen}
      />
    </Stack>
  );
};
