import { Button, CardActions } from '@mui/material';
import styles from './OwnerActions.module.css';

type Props = {
  isApplicant: boolean;
  name: string;
  onEdit: () => void;
  onRemove: () => void;
};

// Text buttons under the owner's details. Each name starts with its visible word, so screen readers
// and voice control both work ("Edit Ben Ortiz", WCAG 2.5.3). The applicant can't be removed.
export const OwnerActions = ({
  isApplicant,
  name,
  onEdit,
  onRemove,
}: Props) => (
  <CardActions className={styles.actions} disableSpacing>
    <Button
      aria-label={isApplicant ? 'Edit your details' : `Edit ${name}`}
      className={styles.action}
      onClick={onEdit}
    >
      Edit
    </Button>
    {!isApplicant && (
      <Button
        aria-label={`Remove ${name}`}
        className={styles.action}
        onClick={onRemove}
      >
        Remove
      </Button>
    )}
  </CardActions>
);
