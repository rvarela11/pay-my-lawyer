import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRef } from 'react';
import styles from './StartOverDialog.module.css';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
};

const TEXT_ID = 'start-over-text';
const TITLE_ID = 'start-over-title';

export const StartOverDialog = ({ onCancel, onConfirm, open }: Props) => {
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
      slotProps={{ transition: { onEntered: handleEntered } }}
    >
      <DialogTitle id={TITLE_ID}>Change payment method?</DialogTitle>
      <DialogContent>
        <DialogContentText id={TEXT_ID}>
          Your answers will be cleared and you&apos;ll start over.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button color='error' onClick={onConfirm}>
          Start over
        </Button>
        {/* The safe choice is the prominent default and gets focus once the dialog has opened, so a
          stray Enter doesn't clear the form. autoFocus is too early: StrictMode's double-run
          effects move focus to the dialog box. */}
        <Button onClick={onCancel} ref={keepRef} variant='contained'>
          Keep my answers
        </Button>
      </DialogActions>
    </Dialog>
  );
};
