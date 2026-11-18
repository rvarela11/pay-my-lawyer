import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { Ref } from 'react';
import { OwnerActions } from './OwnerActions.tsx';
import type { OwnerRow } from './ownerRows.ts';
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
    aria-label='Beneficial owners'
    ref={tableRef}
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
            Total
          </Typography>
        </TableCell>
        <TableCell align='right' className={`${styles.number} ${styles.total}`}>
          <Typography component='span' variant='subtitle2'>
            {`${total}%`}
          </Typography>
        </TableCell>
        <TableCell className={styles.total} />
      </TableRow>
    </TableFooter>
  </Table>
);
