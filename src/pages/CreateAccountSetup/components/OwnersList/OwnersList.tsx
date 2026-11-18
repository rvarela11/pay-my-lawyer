import { useMediaQuery } from '@mui/material';
import type { Owner } from '../OwnerDialog/validation.ts';
import { type Applicant, toOwnerRows, totalOwnership } from './ownerRows.ts';
import styles from './OwnersList.module.css';
import { OwnersMobileList } from './OwnersMobileList.tsx';
import { OwnersTable } from './OwnersTable.tsx';

type Props = {
  applicant: Applicant;
  owners: Owner[];
};

// The Beneficial owners list every provider shows: the applicant and the owners as a table
// (or a divided list on narrow screens), with the total. The provider's screen owns the form.
export const OwnersList = ({ applicant, owners }: Props) => {
  const wide = useMediaQuery('(min-width: 600px)');

  const rows = toOwnerRows(applicant, owners);
  const total = totalOwnership(rows);

  return (
    <div className={styles.screen}>
      {wide ? (
        <OwnersTable rows={rows} total={total} />
      ) : (
        <OwnersMobileList rows={rows} total={total} />
      )}
    </div>
  );
};
