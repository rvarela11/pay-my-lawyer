import { useEffect, useState } from 'react';
import type { UseFormReset } from 'react-hook-form';
import {
  getSetupProgress,
  type SetupProgress,
} from '../data/getSetupProgress.ts';
import {
  clearLocalProgress,
  type LocalProgress,
  readLocalProgress,
  writeLocalProgress,
} from '../data/localProgress.ts';
import {
  getScreenOrder,
  isProvider,
  isScreenId,
  type Provider,
  SCREENS,
  type ScreenId,
} from '../steps.ts';
import { type SetupValues, setupSchema } from '../validation.ts';

// The local record keeps only how far someone got, not their answers. Without a backend draft,
// resume at the first screen whose required answers are missing instead of past it.
const getFirstIncomplete = (
  provider: Provider,
  furthest: ScreenId,
  values: SetupValues,
): ScreenId => {
  const order = getScreenOrder(provider);

  return (
    order.slice(0, order.indexOf(furthest) + 1).find((screen) =>
      SCREENS[screen].fields.some((field) => {
        try {
          setupSchema.validateSyncAt(field, values);
          return false;
        } catch {
          return true;
        }
      }),
    ) ?? furthest
  );
};

// Where the person is in setup: the chosen provider and the furthest screen reached.
// Loads it once (a backend draft wins over the browser record) and keeps the browser record in sync.
export const useSetupProgress = (reset: UseFormReset<SetupValues>) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [furthest, setFurthest] = useState<ScreenId>('provider');
  const [isLoaded, setIsLoaded] = useState(false);

  const saveProgress = (progress: LocalProgress) => {
    setProvider(progress.provider);
    setFurthest(progress.furthest);
    writeLocalProgress(progress);
  };

  const clearProgress = () => {
    setProvider(null);
    setFurthest('provider');
    clearLocalProgress();
  };

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      let progress: SetupProgress;

      try {
        progress = await getSetupProgress();
      } catch {
        progress = { status: 'none' };
      }

      if (!isActive) {
        return;
      }

      if (
        progress.status === 'draft' &&
        isProvider(progress.provider) &&
        isScreenId(progress.furthest) &&
        getScreenOrder(progress.provider).includes(progress.furthest)
      ) {
        reset({
          ...setupSchema.getDefault(),
          ...progress.values,
          provider: progress.provider,
        });
        setProvider(progress.provider);
        setFurthest(progress.furthest);
        writeLocalProgress({
          furthest: progress.furthest,
          provider: progress.provider,
        });
      } else if (
        progress.status === 'submitted' &&
        isProvider(progress.provider)
      ) {
        reset({ ...setupSchema.getDefault(), provider: progress.provider });
        setProvider(progress.provider);
        setFurthest('portal');
      } else {
        const local = readLocalProgress();

        if (local) {
          const values = {
            ...setupSchema.getDefault(),
            provider: local.provider,
          };

          reset(values);
          setProvider(local.provider);
          setFurthest(
            getFirstIncomplete(local.provider, local.furthest, values),
          );
        }
      }

      setIsLoaded(true);
    };

    void load();

    return () => {
      isActive = false;
    };
  }, [reset]);

  return { clearProgress, furthest, isLoaded, provider, saveProgress };
};
