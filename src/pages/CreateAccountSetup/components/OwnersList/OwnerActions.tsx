import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, Tooltip } from '@mui/material';
import styles from './OwnerActions.module.css';

type Props = {
  isApplicant: boolean;
  name: string;
  onEdit: () => void;
  onRemove: () => void;
};

// Icon buttons keep every row one line high; the tooltip shows each button's name. The
// applicant can't be removed, so their row only has Edit.
export const OwnerActions = ({
  isApplicant,
  name,
  onEdit,
  onRemove,
}: Props) => {
  const editLabel = isApplicant ? 'Edit your details' : `Edit ${name}`;
  const removeLabel = `Remove ${name}`;

  return (
    <div className={styles.actions}>
      <Tooltip title={editLabel}>
        <IconButton aria-label={editLabel} onClick={onEdit}>
          <EditOutlined />
        </IconButton>
      </Tooltip>
      {!isApplicant && (
        <Tooltip title={removeLabel}>
          <IconButton aria-label={removeLabel} onClick={onRemove}>
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};
