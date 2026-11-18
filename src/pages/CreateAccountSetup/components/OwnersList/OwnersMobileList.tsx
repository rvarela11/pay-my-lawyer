import { List, ListItem, Typography } from '@mui/material';
import type { Ref } from 'react';
import { OwnerActions } from './OwnerActions.tsx';
import { OwnerDetail } from './OwnerDetail.tsx';
import type { OwnerRow } from './ownerRows.ts';
import styles from './OwnersMobileList.module.css';

type Props = {
  listRef: Ref<HTMLUListElement>;
  onEdit: (row: OwnerRow) => void;
  onRemove: (row: OwnerRow) => void;
  rows: OwnerRow[];
  total: number;
};

// The owners list on narrow screens: one divided item per owner, then the total.
export const OwnersMobileList = ({
  listRef,
  onEdit,
  onRemove,
  rows,
  total,
}: Props) => (
  <>
    <List
      aria-label='Beneficial owners'
      disablePadding
      ref={listRef}
      tabIndex={-1}
    >
      {rows.map((row) => (
        <ListItem className={styles.owner} disableGutters divider key={row.id}>
          <div className={styles.header}>
            <Typography component='p' variant='subtitle1'>
              {row.name}
            </Typography>
            <div className={styles.actions}>
              <OwnerActions
                isApplicant={!row.owner}
                name={row.name}
                onEdit={() => onEdit(row)}
                onRemove={() => onRemove(row)}
              />
            </div>
          </div>
          <dl className={styles.details}>
            <OwnerDetail label='Ownership' value={`${row.ownership}%`} />
            <OwnerDetail label='Bar Card #' value={row.barNumber} />
            <OwnerDetail label='DOB' value={row.dateOfBirth} />
            <OwnerDetail label='Title' value={row.title} />
          </dl>
        </ListItem>
      ))}
    </List>
    <dl className={styles.details}>
      <OwnerDetail
        label='Total ownership'
        value={`${total}%`}
        variant='subtitle2'
      />
    </dl>
  </>
);
