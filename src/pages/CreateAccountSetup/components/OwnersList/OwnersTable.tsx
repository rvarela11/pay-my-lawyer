import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { OWNER_LABELS } from './ownerLabels.ts';
import styles from './OwnersTable.module.css';
import type { OwnerRow } from './toOwnerRows.ts';

type Props = {
  rows: OwnerRow[];
  total: number;
};

// The owners list on wider screens.
export const OwnersTable = ({ rows, total }: Props) => (
  <Table aria-label={OWNER_LABELS.list} size='small'>
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
        <TableCell align='right' className={`${styles.number} ${styles.total}`}>
          <Typography component='span' variant='subtitle2'>
            {`${total}%`}
          </Typography>
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);
