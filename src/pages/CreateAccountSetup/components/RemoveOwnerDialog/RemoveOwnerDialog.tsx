import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import styles from './RemoveOwnerDialog.module.css';

type Props = {
  name: string;
  onCancel: () => void;
  // Runs once the dialog has finished closing.
  onClosed: () => void;
  onConfirm: () => void;
  open: boolean;
};

const TEXT_ID = 'remove-owner-text';
const TITLE_ID = 'remove-owner-title';

export const RemoveOwnerDialog = ({
  name,
  onCancel,
  onClosed,
  onConfirm,
  open,
}: Props) => (
  <Dialog
    aria-describedby={TEXT_ID}
    aria-labelledby={TITLE_ID}
    onClose={onCancel}
    open={open}
    role='alertdialog'
    slotProps={{ transition: { onExited: onClosed } }}
  >
    <DialogTitle id={TITLE_ID}>Remove {name}?</DialogTitle>
    <DialogContent>
      <DialogContentText id={TEXT_ID}>
        Their details will be removed from this application.
      </DialogContentText>
    </DialogContent>
    <DialogActions className={styles.actions}>
      <Button color='error' onClick={onConfirm}>
        Remove
      </Button>
      {/* The safe choice is the prominent default and gets focus, so a stray Enter keeps the owner. */}
      <Button autoFocus onClick={onCancel} variant='contained'>
        Keep
      </Button>
    </DialogActions>
  </Dialog>
);
