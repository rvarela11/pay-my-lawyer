import { useState } from 'react';
import type { Owner } from '../../OwnerDialog/validation.ts';

type Options = {
  onRemove: (id: string) => void;
  onSave: (owner: Owner) => void;
  // Everyone's ownership added up, the applicant included.
  total: number;
};

// Which owner the Add/Edit and Remove dialogs are showing, and what their buttons do.
export const useOwnerDialogs = ({ onRemove, onSave, total }: Options) => {
  const [dialogOwner, setDialogOwner] = useState<Owner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [removing, setRemoving] = useState<Owner | null>(null);

  // What's left for the owner in the dialog: their own % counts as available while editing.
  const remaining =
    100 - total + (dialogOwner ? Number(dialogOwner.ownership) : 0);

  const askRemove = (owner: Owner) => {
    setRemoving(owner);
  };

  const cancelRemove = () => {
    setRemoving(null);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmRemove = () => {
    if (removing) {
      onRemove(removing.id);
    }

    setRemoving(null);
  };

  const openAdd = () => {
    setDialogOwner(null);
    setIsDialogOpen(true);
  };

  const openEdit = (owner: Owner) => {
    setDialogOwner(owner);
    setIsDialogOpen(true);
  };

  const save = (owner: Owner) => {
    onSave(owner);
    setIsDialogOpen(false);
  };

  return {
    askRemove,
    cancelRemove,
    closeDialog,
    confirmRemove,
    dialogOwner,
    isDialogOpen,
    openAdd,
    openEdit,
    remaining,
    removing,
    save,
  };
};
