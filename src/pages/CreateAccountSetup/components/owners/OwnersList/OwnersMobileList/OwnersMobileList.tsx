import { List, ListItem, Stack, Typography } from '@mui/material';
import type { Ref } from 'react';
import { OwnerActions } from '../OwnerActions/OwnerActions.tsx';
import { OwnerDetail } from '../OwnerDetail/OwnerDetail.tsx';
import { OWNER_LABELS } from '../ownerLabels.ts';
import type { OwnerRow } from '../toOwnerRows.ts';
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
      aria-label={OWNER_LABELS.list}
      disablePadding
      ref={listRef}
      tabIndex={-1}
    >
      {rows.map((row) => (
        <ListItem className={styles.owner} disableGutters divider key={row.id}>
          <Stack className={styles.body} spacing={1} useFlexGap>
            <Stack
              className={styles.header}
              direction='row'
              spacing={1}
              useFlexGap
            >
              <Typography
                className={styles.name}
                component='p'
                title={row.name}
                variant='subtitle1'
              >
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
            </Stack>
            <dl className={styles.details}>
              <OwnerDetail
                label={OWNER_LABELS.ownership}
                value={`${row.ownership}%`}
              />
              <OwnerDetail
                label={OWNER_LABELS.barNumber}
                value={row.barNumber}
              />
              <OwnerDetail label={OWNER_LABELS.title} value={row.title} />
            </dl>
          </Stack>
        </ListItem>
      ))}
    </List>
    <dl className={styles.details}>
      <OwnerDetail
        label={OWNER_LABELS.totalOwnership}
        value={`${total}%`}
        variant='subtitle2'
      />
    </dl>
  </>
);
