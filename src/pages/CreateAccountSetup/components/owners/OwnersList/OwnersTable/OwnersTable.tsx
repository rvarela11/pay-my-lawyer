import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import type { Ref } from 'react';
import { VisuallyHidden } from '@/components/VisuallyHidden/VisuallyHidden.tsx';
import { OwnerActions } from '../OwnerActions/OwnerActions.tsx';
import { OWNER_LABELS } from '../ownerLabels.ts';
import type { OwnerRow } from '../toOwnerRows.ts';
import styles from './OwnersTable.module.css';

type Props = {
  onEdit: (row: OwnerRow) => void;
  onRemove: (row: OwnerRow) => void;
  rows: OwnerRow[];
  tableRef: Ref<HTMLTableElement>;
  total: number;
};

// The owners list on wider screens.
export const OwnersTable = ({
  onEdit,
  onRemove,
  rows,
  tableRef,
  total,
}: Props) => (
  <Table
    aria-label={OWNER_LABELS.list}
    ref={tableRef}
    size='small'
    tabIndex={-1}
  >
    <TableHead>
      <TableRow>
        <TableCell>{OWNER_LABELS.name}</TableCell>
        <TableCell className={styles.nowrap}>
          {OWNER_LABELS.barNumber}
        </TableCell>
        <TableCell className={styles.nowrap}>
          <abbr className={styles.abbr} title={OWNER_LABELS.dateOfBirthFull}>
            {OWNER_LABELS.dateOfBirth}
          </abbr>
        </TableCell>
        <TableCell>{OWNER_LABELS.title}</TableCell>
        <TableCell align='right'>{OWNER_LABELS.ownership}</TableCell>
        <TableCell>
          <VisuallyHidden>{OWNER_LABELS.actions}</VisuallyHidden>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell className={styles.nowrap}>{row.barNumber}</TableCell>
          <TableCell className={styles.nowrap}>{row.dateOfBirth}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell align='right' className={styles.number}>
            {`${row.ownership}%`}
          </TableCell>
          <TableCell>
            <OwnerActions
              isApplicant={!row.owner}
              name={row.name}
              onEdit={() => onEdit(row)}
              onRemove={() => onRemove(row)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    {/* The total sits under the Ownership column it adds up. */}
    <TableFooter>
      <TableRow>
        <TableCell className={styles.total} colSpan={4}>
          <Typography component='span' variant='subtitle2'>
            {OWNER_LABELS.total}
          </Typography>
        </TableCell>
        <TableCell
          align='right'
          className={classNames(styles.number, styles.total)}
        >
          <Typography component='span' variant='subtitle2'>
            {`${total}%`}
          </Typography>
        </TableCell>
        <TableCell className={styles.total} />
      </TableRow>
    </TableFooter>
  </Table>
);
