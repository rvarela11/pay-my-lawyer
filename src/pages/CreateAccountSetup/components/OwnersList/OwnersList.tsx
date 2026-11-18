import Add from '@mui/icons-material/Add';
import { Alert, Button, useMediaQuery } from '@mui/material';
import { useEffect, useRef } from 'react';
import { OwnerDialog } from '../OwnerDialog/OwnerDialog.tsx';
import type { Owner } from '../OwnerDialog/validation.ts';
import { RemoveOwnerDialog } from '../RemoveOwnerDialog/RemoveOwnerDialog.tsx';
import { useOwnerDialogs } from './hooks/useOwnerDialogs.ts';
import {
  type Applicant,
  fullName,
  type OwnerRow,
  toOwnerRows,
  totalOwnership,
} from './ownerRows.ts';
import styles from './OwnersList.module.css';
import { OwnersMobileList } from './OwnersMobileList.tsx';
import { OwnersTable } from './OwnersTable.tsx';

type Props = {
  applicant: Applicant;
  onEditApplicant: () => void;
  onRemove: (id: string) => void;
  onSave: (owner: Owner) => void;
  owners: Owner[];
  // The total-over-100% error from Next, if any.
  totalError?: string;
};

// The Beneficial owners list every provider shows: the applicant and the owners as a table
// (or cards on narrow screens), the total, and the Add/Edit and Remove dialogs. The provider's
// screen owns the form and saves what this list hands back.
export const OwnersList = ({
  applicant,
  onEditApplicant,
  onRemove,
  onSave,
  owners,
  totalError,
}: Props) => {
  const wide = useMediaQuery('(min-width: 600px)');
  const addRef = useRef<HTMLButtonElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const rows = toOwnerRows(applicant, owners);
  const total = totalOwnership(rows);
  const dialogs = useOwnerDialogs({ onRemove, onSave, total });

  // A dialog gives focus back to the button that opened it. Removing an owner, or a save that
  // hides Add owner, takes that button away, so focus goes to Add owner or the list instead of
  // falling back to the top of the page.
  const handleDialogClosed = () => {
    if (document.activeElement === document.body) {
      (addRef.current ?? tableRef.current ?? cardsRef.current)?.focus();
    }
  };

  const handleEdit = (row: OwnerRow) => {
    if (row.owner) {
      dialogs.openEdit(row.owner);
    } else {
      onEditApplicant();
    }
  };

  const handleRemove = (row: OwnerRow) => {
    if (row.owner) {
      dialogs.askRemove(row.owner);
    }
  };

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
          <Button onClick={dialogs.openAdd} ref={addRef} startIcon={<Add />}>
            Add owner
          </Button>
        </div>
      )}
      {wide ? (
        <OwnersTable
          onEdit={handleEdit}
          onRemove={handleRemove}
          rows={rows}
          tableRef={tableRef}
          total={total}
        />
      ) : (
        <OwnersMobileList
          listRef={cardsRef}
          onEdit={handleEdit}
          onRemove={handleRemove}
          rows={rows}
          total={total}
        />
      )}
      <OwnerDialog
        onCancel={dialogs.closeDialog}
        onClosed={handleDialogClosed}
        onSave={dialogs.save}
        open={dialogs.isDialogOpen}
        owner={dialogs.dialogOwner}
        remaining={dialogs.remaining}
      />
      <RemoveOwnerDialog
        name={
          dialogs.removing
            ? fullName(dialogs.removing.firstName, dialogs.removing.lastName)
            : ''
        }
        onCancel={dialogs.cancelRemove}
        onClosed={handleDialogClosed}
        onConfirm={dialogs.confirmRemove}
        open={dialogs.isRemoveOpen}
      />
    </div>
  );
};
