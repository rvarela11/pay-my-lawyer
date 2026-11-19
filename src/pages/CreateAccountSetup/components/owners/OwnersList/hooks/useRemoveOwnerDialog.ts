import { useState } from 'react';
import type { Owner } from '@/pages/CreateAccountSetup/components/owners/OwnerDialog/validation.ts';

type Options = {
  onRemove: (id: string) => void;
};

// The Remove owner confirmation: which owner it asks about and what its buttons do.
export const useRemoveOwnerDialog = ({ onRemove }: Options) => {
  const [isOpen, setIsOpen] = useState(false);
  // Kept after the dialog closes, so its title keeps the name while it fades out.
  const [owner, setOwner] = useState<Owner | null>(null);

  const ask = (removing: Owner) => {
    setOwner(removing);
    setIsOpen(true);
  };

  const cancel = () => {
    setIsOpen(false);
  };

  const confirm = () => {
    if (owner) {
      onRemove(owner.id);
    }

    setIsOpen(false);
  };

  return { ask, cancel, confirm, isOpen, owner };
};
