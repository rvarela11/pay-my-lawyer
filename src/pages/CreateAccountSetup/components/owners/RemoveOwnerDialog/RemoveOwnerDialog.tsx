import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRef } from 'react';

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
}: Props) => {
  const keepRef = useRef<HTMLButtonElement>(null);

  const handleEntered = () => {
    keepRef.current?.focus();
  };

  return (
    <Dialog
      aria-describedby={TEXT_ID}
      aria-labelledby={TITLE_ID}
      onClose={onCancel}
      open={open}
      role='alertdialog'
      slotProps={{
        transition: { onEntered: handleEntered, onExited: onClosed },
      }}
    >
      <DialogTitle id={TITLE_ID}>Remove {name}?</DialogTitle>
      <DialogContent>
        <DialogContentText id={TEXT_ID}>
          Their details will be removed from this application.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={onConfirm}>
          Remove
        </Button>
        {/* The safe choice is the prominent default and gets focus once the dialog has opened, so a
          stray Enter keeps the owner. autoFocus is too early: StrictMode's double-run effects move
          focus to the dialog box. */}
        <Button onClick={onCancel} ref={keepRef} variant='contained'>
          Keep
        </Button>
      </DialogActions>
    </Dialog>
  );
};
