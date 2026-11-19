import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, Stack, Tooltip } from '@mui/material';
import styles from './OwnerActions.module.css';

type Props = {
  isApplicant: boolean;
  name: string;
  onEdit: () => void;
  onRemove: () => void;
};

// Icon buttons keep every row one line high; the tooltip shows each button's name. The
// applicant can't be removed, so their row keeps an empty slot there and every Edit lines up.
export const OwnerActions = ({
  isApplicant,
  name,
  onEdit,
  onRemove,
}: Props) => {
  const editLabel = isApplicant ? 'Edit your details' : `Edit ${name}`;
  const removeLabel = `Remove ${name}`;

  return (
    <Stack className={styles.actions} direction='row' spacing={0.5} useFlexGap>
      <Tooltip title={editLabel}>
        <IconButton aria-label={editLabel} color='inherit' onClick={onEdit}>
          <EditOutlined />
        </IconButton>
      </Tooltip>
      {isApplicant ? (
        <span aria-hidden className={styles.slot} />
      ) : (
        <Tooltip title={removeLabel}>
          <IconButton
            aria-label={removeLabel}
            color='inherit'
            onClick={onRemove}
          >
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};
