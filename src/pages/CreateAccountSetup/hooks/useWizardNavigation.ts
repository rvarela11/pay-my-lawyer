import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FIELDS } from '../fields.ts';
import { SCREEN_IDS, type ScreenId } from '../ids.ts';
import { getScreenOrder, isProvider, SCREENS } from '../steps.ts';
import type { useSetupForms } from './useSetupForms.ts';
import type { useSetupProgress } from './useSetupProgress.ts';

type Options = {
  forms: ReturnType<typeof useSetupForms>;
  progress: ReturnType<typeof useSetupProgress>;
  screen: ScreenId | null;
};

// Moving through the wizard: which screens are reachable, Next, Back and the start-over dialog.
export const useWizardNavigation = ({ forms, progress, screen }: Options) => {
  const navigate = useNavigate();
  const [isStartOverOpen, setIsStartOverOpen] = useState(false);
  const { clearProgress, furthest, provider, saveProgress } = progress;

  const order = provider ? getScreenOrder(provider) : [];
  const isReachable =
    screen === SCREEN_IDS.provider ||
    (screen !== null &&
      order.includes(screen) &&
      order.indexOf(screen) <= order.indexOf(furthest));

  const goNext = async () => {
    if (!screen) {
      return;
    }

    const { fields } = SCREENS[screen];
    const form = forms.getForm(screen, provider);

    if (
      fields.length > 0 &&
      !(await form.trigger([...fields], { shouldFocus: true }))
    ) {
      // Next checks fields without submitting, so mark them touched: onTouched then re-checks
      // each change and clears an error as soon as it's fixed.
      for (const field of fields) {
        form.setValue(field, form.getValues(field), { shouldTouch: true });
      }

      return;
    }

    let nextProvider = provider;
    let nextFurthest = furthest;

    if (screen === SCREEN_IDS.provider) {
      const chosen = forms.providerForm.getValues(FIELDS.provider);

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
      screen === SCREEN_IDS.provider
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

  const goBack = () => {
    if (!screen || screen === SCREEN_IDS.provider || !provider) {
      return;
    }

    const index = order.indexOf(screen);
    const previous = index > 0 ? order[index - 1] : SCREEN_IDS.provider;

    if (previous === SCREEN_IDS.provider && forms.hasAnswers(provider)) {
      setIsStartOverOpen(true);
      return;
    }

    void navigate(SCREENS[previous].path);
  };

  const handleStartOverCancel = () => {
    setIsStartOverOpen(false);
  };

  const handleStartOver = () => {
    forms.resetAll();
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
