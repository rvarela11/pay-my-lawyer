import { useState } from 'react';
import type { Owner } from '../../OwnerDialog/validation.ts';

type Options = {
  onSave: (owner: Owner) => void;
  // Everyone's ownership added up, the applicant included.
  total: number;
};

// The Add/Edit owner dialog: which owner it shows (null when adding) and what its buttons do.
export const useOwnerDialog = ({ onSave, total }: Options) => {
  const [isOpen, setIsOpen] = useState(false);
  const [owner, setOwner] = useState<Owner | null>(null);

  // What's left for the owner in the dialog: their own % counts as available while editing.
  const remaining = 100 - total + (owner ? Number(owner.ownership) : 0);

  const close = () => {
    setIsOpen(false);
  };

  const openAdd = () => {
    setOwner(null);
    setIsOpen(true);
  };

  const openEdit = (editing: Owner) => {
    setOwner(editing);
    setIsOpen(true);
  };

  const save = (saved: Owner) => {
    onSave(saved);
    setIsOpen(false);
  };

  return { close, isOpen, openAdd, openEdit, owner, remaining, save };
};
