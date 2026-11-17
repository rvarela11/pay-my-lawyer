import {
  getScreenOrder,
  isProvider,
  isScreenId,
  type Provider,
  type ScreenId,
} from '../steps.ts';

export type LocalProgress = { furthest: ScreenId; provider: Provider };

const KEY = 'pml.setupProgress';

// Only the provider and the furthest screen are kept in the browser. Field values never are:
// they include SSN and date of birth, and come back from the backend draft instead.
export const readLocalProgress = (): LocalProgress | null => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? 'null');

    if (typeof value !== 'object' || value === null) {
      return null;
    }

    const { furthest, provider } = value as Record<string, unknown>;

    return isProvider(provider) &&
      isScreenId(furthest) &&
      getScreenOrder(provider).includes(furthest)
      ? { furthest, provider }
      : null;
  } catch {
    return null;
  }
};

export const writeLocalProgress = ({ furthest, provider }: LocalProgress) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ furthest, provider }));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); progress then lives only in memory.
  }
};

export const clearLocalProgress = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // See writeLocalProgress.
  }
};
