import React, { forwardRef, useContext, useMemo } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { CheckIcon } from '../../../icons';
import {
  StepContext,
  StepperContext,
  TStepStatus,
} from '../context';
import { StepContent } from '../step-content';
import { StepDescription } from '../step-description';
import { StepIndicator } from '../step-indicator';
import { StepNumber } from '../step-number';
import { StepSeparator } from '../step-separator';
import { StepStatus } from '../step-status';
import { StepTitle } from '../step-title';
import { stepClasses } from './classes';
import {
  SStep,
  SStepBody,
  SStepLabels,
  SStepMain,
  SStepRail,
} from './styles';
import { TStepProps } from './types';

const resolveStatus = (
  index: number,
  activeStep: number,
  completed?: boolean,
): TStepStatus => {
  if (completed || index < activeStep) {
    return 'complete';
  }
  if (index === activeStep) {
    return 'active';
  }
  return 'incomplete';
};

const Step = forwardRef<HTMLLIElement, TStepProps>(
  (
    {
      children,
      title,
      description,
      index = 0,
      completed,
      optional = false,
      error = false,
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const stepper = useContext(StepperContext);
    if (!stepper) {
      throw new Error('Step must be used within Stepper');
    }

    const {
      activeStep,
      orientation,
      alternativeLabel,
      setActiveStep,
    } = stepper;

    const status = resolveStatus(index, activeStep, completed);
    const isRecipe = title != null || description != null;

    const value = useMemo(
      () => ({
        index,
        status,
        optional,
        error,
        disabled,
      }),
      [disabled, error, index, optional, status],
    );

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      if (!disabled && !event.defaultPrevented) {
        setActiveStep?.(index);
      }
    };

    const indicator = (
      <StepIndicator>
        <StepStatus
          complete={<CheckIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>
    );

    const labels =
      title != null || description != null || optional ? (
        <SStepLabels className={stepClasses.labels}>
          {title != null ? <StepTitle>{title}</StepTitle> : null}
          {description != null ? (
            <StepDescription>{description}</StepDescription>
          ) : null}
          {optional ? <StepDescription>Optional</StepDescription> : null}
        </SStepLabels>
      ) : null;

    return (
      <StepContext.Provider value={value}>
        <SStep
          ref={ref}
          orientation={orientation}
          alternativeLabel={alternativeLabel}
          status={status}
          error={error}
          disabled={disabled}
          data-status={status}
          aria-current={status === 'active' ? 'step' : undefined}
          onClick={handleClick}
          {...props}
          className={mergeClasses(
            stepClasses.root,
            orientation === 'horizontal'
              ? stepClasses.horizontal
              : stepClasses.vertical,
            alternativeLabel && stepClasses.alternativeLabel,
            status === 'complete' && stepClasses.completed,
            status === 'active' && stepClasses.active,
            error && stepClasses.error,
            disabled && stepClasses.disabled,
            className,
          )}
        >
          {isRecipe ? (
            orientation === 'vertical' ? (
              <>
                <SStepRail>
                  {indicator}
                  <StepSeparator />
                </SStepRail>
                <SStepBody>
                  {labels}
                  {children != null ? (
                    <StepContent>{children}</StepContent>
                  ) : null}
                </SStepBody>
              </>
            ) : (
              <>
                <SStepMain
                  className={stepClasses.main}
                  alternativeLabel={alternativeLabel}
                >
                  {indicator}
                  {labels}
                </SStepMain>
                <StepSeparator />
              </>
            )
          ) : (
            children
          )}
        </SStep>
      </StepContext.Provider>
    );
  },
);

Step.displayName = 'Step';

export type { TStepProps } from './types';
export { stepClasses } from './classes';
export {
  SStepMain as StepMain,
  SStepLabels as StepLabels,
  SStepRail as StepRail,
  SStepBody as StepBody,
} from './styles';
export { Step };
export default Step;
