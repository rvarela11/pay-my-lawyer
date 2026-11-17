import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import styles from './StartOverDialog.module.css';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
};

const TITLE_ID = 'start-over-title';
const TEXT_ID = 'start-over-text';

export const StartOverDialog = ({ onCancel, onConfirm, open }: Props) => (
  <Dialog
    aria-describedby={TEXT_ID}
    aria-labelledby={TITLE_ID}
    onClose={onCancel}
    open={open}
    role='alertdialog'
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
      {/* The safe choice is the prominent default and gets focus, so a stray Enter doesn't clear the form. */}
      <Button autoFocus onClick={onCancel} variant='contained'>
        Keep my answers
      </Button>
    </DialogActions>
  </Dialog>
);
