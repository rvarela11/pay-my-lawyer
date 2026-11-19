import { List, ListItem, Typography } from '@mui/material';
import { OwnerDetail } from './OwnerDetail.tsx';
import { OWNER_LABELS } from './ownerLabels.ts';
import styles from './OwnersMobileList.module.css';
import type { OwnerRow } from './toOwnerRows.ts';

type Props = {
  rows: OwnerRow[];
  total: number;
};

// The owners list on narrow screens: one divided item per owner, then the total.
export const OwnersMobileList = ({ rows, total }: Props) => (
  <>
    <List aria-label={OWNER_LABELS.list} disablePadding>
      {rows.map((row) => (
        <ListItem className={styles.owner} disableGutters divider key={row.id}>
          <div className={styles.header}>
            <Typography component='p' variant='subtitle1'>
              {row.name}
            </Typography>
          </div>
          <dl className={styles.details}>
            <OwnerDetail
              label={OWNER_LABELS.ownership}
              value={`${row.ownership}%`}
            />
            <OwnerDetail label={OWNER_LABELS.barNumber} value={row.barNumber} />
            <OwnerDetail
              label={OWNER_LABELS.dateOfBirth}
              value={row.dateOfBirth}
            />
            <OwnerDetail label={OWNER_LABELS.title} value={row.title} />
          </dl>
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
