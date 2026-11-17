import { useState } from 'react';
import { type Provider, SCREEN_IDS, type ScreenId } from '../ids.ts';

type Progress = { furthest: ScreenId; provider: Provider };

// Where the person is in setup: the chosen provider and the furthest screen reached.
// Kept in memory for this visit only; every new visit starts at the provider choice.
export const useSetupProgress = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [furthest, setFurthest] = useState<ScreenId>(SCREEN_IDS.provider);

  const saveProgress = (progress: Progress) => {
    setProvider(progress.provider);
    setFurthest(progress.furthest);
  };

  const clearProgress = () => {
    setProvider(null);
    setFurthest(SCREEN_IDS.provider);
  };

  return { clearProgress, furthest, provider, saveProgress };
};
