import { useCallback, useState } from 'react';

export type TUseStepsOptions = {
  index?: number;
  count: number;
};

export type TUseStepsReturn = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  isActiveStep: (step: number) => boolean;
  isCompleteStep: (step: number) => boolean;
  isIncompleteStep: (step: number) => boolean;
};

export const useSteps = ({
  index = 0,
  count,
}: TUseStepsOptions): TUseStepsReturn => {
  const [activeStep, setActiveStepState] = useState(index);

  const setActiveStep = useCallback(
    (step: number) => {
      const next = Math.min(Math.max(step, 0), Math.max(count - 1, 0));
      setActiveStepState(next);
    },
    [count],
  );

  const goToNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const goToPrevious = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  const isActiveStep = useCallback(
    (step: number) => step === activeStep,
    [activeStep],
  );

  const isCompleteStep = useCallback(
    (step: number) => step < activeStep,
    [activeStep],
  );

  const isIncompleteStep = useCallback(
    (step: number) => step > activeStep,
    [activeStep],
  );

  return {
    activeStep,
    setActiveStep,
    goToNext,
    goToPrevious,
    isActiveStep,
    isCompleteStep,
    isIncompleteStep,
  };
};
