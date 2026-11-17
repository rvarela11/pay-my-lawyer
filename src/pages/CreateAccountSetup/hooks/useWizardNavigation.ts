import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FIELDS } from '../fields.ts';
import {
  getScreenOrder,
  isProvider,
  SCREENS,
  type ScreenId,
} from '../steps.ts';
import { type SetupValues, setupSchema } from '../validation.ts';
import type { useSetupProgress } from './useSetupProgress.ts';

type Options = {
  form: UseFormReturn<SetupValues>;
  progress: ReturnType<typeof useSetupProgress>;
  screen: ScreenId | null;
};

// Moving through the wizard: which screens are reachable, Next, Back and the start-over dialog.
export const useWizardNavigation = ({ form, progress, screen }: Options) => {
  const navigate = useNavigate();
  const [isStartOverOpen, setIsStartOverOpen] = useState(false);
  const { clearProgress, furthest, provider, saveProgress } = progress;

  const order = provider ? getScreenOrder(provider) : [];
  const isReachable =
    screen === 'provider' ||
    (screen !== null &&
      order.includes(screen) &&
      order.indexOf(screen) <= order.indexOf(furthest));

  const goNext = async () => {
    if (!screen) {
      return;
    }

    const { fields } = SCREENS[screen];

    if (
      fields.length > 0 &&
      !(await form.trigger([...fields], { shouldFocus: true }))
    ) {
      return;
    }

    let nextProvider = provider;
    let nextFurthest = furthest;

    if (screen === 'provider') {
      const chosen = form.getValues(FIELDS.provider);

      if (!isProvider(chosen)) {
        return;
      }

      if (chosen !== provider) {
        nextProvider = chosen;
        nextFurthest = getScreenOrder(chosen)[0];
      }
    }

    if (!nextProvider) {
      return;
    }

    const nextOrder = getScreenOrder(nextProvider);
    const next =
      screen === 'provider'
        ? nextOrder[0]
        : nextOrder[nextOrder.indexOf(screen) + 1];

    if (!next) {
      return;
    }

    if (nextOrder.indexOf(next) > nextOrder.indexOf(nextFurthest)) {
      nextFurthest = next;
    }

    saveProgress({ furthest: nextFurthest, provider: nextProvider });
    await navigate(SCREENS[next].path);
  };

  // Compared with the empty defaults rather than isDirty, so answers restored from a draft count too.
  const hasAnswers = () => {
    const defaults = setupSchema.getDefault();

    return Object.entries(form.getValues()).some(
      ([name, value]) =>
        name !== FIELDS.provider &&
        value !== defaults[name as keyof typeof defaults],
    );
  };

  const goBack = () => {
    if (!screen || screen === 'provider' || !provider) {
      return;
    }

    const index = order.indexOf(screen);
    const previous = index > 0 ? order[index - 1] : 'provider';

    if (previous === 'provider' && hasAnswers()) {
      setIsStartOverOpen(true);
      return;
    }

    void navigate(SCREENS[previous].path);
  };

  const handleStartOverCancel = () => {
    setIsStartOverOpen(false);
  };

  const handleStartOver = () => {
    form.reset(setupSchema.getDefault());
    clearProgress();
    setIsStartOverOpen(false);
    void navigate(SCREENS.provider.path);
  };

  return {
    goBack,
    goNext,
    handleStartOver,
    handleStartOverCancel,
    isReachable,
    isStartOverOpen,
  };
};
