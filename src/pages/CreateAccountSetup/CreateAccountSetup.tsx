import { Button, Stack, Typography } from '@mui/material';
import {
  type MouseEvent,
  type SubmitEvent,
  useLayoutEffect,
  useRef,
} from 'react';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet, useLocation } from 'react-router';
import { Container } from '@/components/Container/Container.tsx';
import { Section } from '@/components/Section/Section.tsx';
import { StartOverDialog } from './components/wizard/StartOverDialog/StartOverDialog.tsx';
import { StepIndicator } from './components/wizard/StepIndicator/StepIndicator.tsx';
import styles from './CreateAccountSetup.module.css';
import { useSetupForms } from './hooks/useSetupForms.ts';
import { useSetupProgress } from './hooks/useSetupProgress.ts';
import { useWizardNavigation } from './hooks/useWizardNavigation.ts';
import { SCREEN_IDS, type ScreenId, TITLE_ID } from './ids.ts';
import { getScreenByPath, getStagePosition, SCREENS, STAGES } from './steps.ts';

export const CreateAccountSetup = () => {
  const { pathname } = useLocation();
  const screen = getScreenByPath(pathname);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shownScreen = useRef<ScreenId | null>(null);

  const forms = useSetupForms();
  const progress = useSetupProgress();
  const { furthest, provider } = progress;
  const {
    goBack,
    goNext,
    handleStartOver,
    handleStartOverCancel,
    isReachable,
    isStartOverOpen,
  } = useWizardNavigation({ forms, progress, screen });

  const form = forms.getForm(screen, provider);
  const position = screen ? getStagePosition(provider, screen) : null;
  // The second click of a double-click (detail 2) would skip the screen that just opened.
  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    void goNext();
  };

  // Move focus to the new heading on every screen change, but not on the first screen shown,
  // so screen readers announce where the user is now (WCAG 2.4.3).
  // A layout effect, so focus moves before anything can interact with the new screen; a late
  // passive effect could steal focus from a field the user had already clicked.
  useLayoutEffect(() => {
    if (!screen || !isReachable) {
      return;
    }

    if (shownScreen.current && shownScreen.current !== screen) {
      titleRef.current?.focus();
    }

    shownScreen.current = screen;
  }, [isReachable, screen]);

  if (!screen || !isReachable) {
    return <Navigate replace to={SCREENS[furthest].path} />;
  }

  return (
    <Section aria-labelledby={TITLE_ID} spacing='form'>
      <Container size={SCREENS[screen].wide ? 'large' : 'medium'}>
        <FormProvider {...form}>
          {provider && position && (
            <StepIndicator
              labels={STAGES[provider].map((stage) => stage.label)}
              number={position.number}
              total={position.total}
            />
          )}
          <Stack spacing={1} useFlexGap>
            <Typography
              className={styles.title}
              component='h1'
              id={TITLE_ID}
              ref={titleRef}
              tabIndex={-1}
              variant='h4'
            >
              {SCREENS[screen].title}
            </Typography>
            {provider && position && (
              <Typography className={styles.step} component='p' variant='body2'>
                Step {position.number} of {position.total}
              </Typography>
            )}
          </Stack>
          <Stack
            className={styles.form}
            component='form'
            noValidate
            onSubmit={handleSubmit}
            spacing={4}
            useFlexGap
          >
            <Outlet />
            <Stack direction='row' spacing={2} useFlexGap>
              {screen !== SCREEN_IDS.provider && (
                <Button onClick={goBack} size='large' variant='outlined'>
                  Back
                </Button>
              )}
              {screen !== SCREEN_IDS.portal && (
                <Button
                  className={styles.next}
                  onClick={handleNextClick}
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Next
                </Button>
              )}
            </Stack>
          </Stack>
          <StartOverDialog
            onCancel={handleStartOverCancel}
            onConfirm={handleStartOver}
            open={isStartOverOpen}
          />
        </FormProvider>
      </Container>
    </Section>
  );
};
