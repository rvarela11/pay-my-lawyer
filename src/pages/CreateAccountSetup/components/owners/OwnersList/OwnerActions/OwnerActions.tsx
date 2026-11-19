import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, Stack, Tooltip } from '@mui/material';

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
    <Stack
      direction='row'
      spacing={0.5}
      sx={{ justifyContent: 'flex-end' }}
      useFlexGap
    >
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
    </Stack>
  );
};
