import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { stepperClasses } from './classes';
import { StepperContext } from './context';
import { SStepper } from './styles';
import { TStepperProps } from './types';

const Stepper = forwardRef<HTMLOListElement, TStepperProps>(
  (
    {
      children,
      activeStep: activeStepProp,
      defaultActiveStep = 0,
      onChange,
      orientation = 'horizontal',
      alternativeLabel = false,
      color = 'primary',
      variant = 'solid',
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = activeStepProp !== undefined;
    const [uncontrolledStep, setUncontrolledStep] = useState(defaultActiveStep);
    const activeStep = isControlled ? Number(activeStepProp) : uncontrolledStep;

    const setActiveStep = useCallback(
      (next: number) => {
        if (!isControlled) {
          setUncontrolledStep(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const value = useMemo(
      () => ({
        activeStep,
        orientation,
        alternativeLabel,
        color,
        variant,
        size,
        setActiveStep,
      }),
      [
        activeStep,
        alternativeLabel,
        color,
        orientation,
        setActiveStep,
        size,
        variant,
      ],
    );

    const items = Children.toArray(children).filter(isValidElement);

    return (
      <StepperContext.Provider value={value}>
        <SStepper
          ref={ref}
          orientation={orientation}
          alternativeLabel={alternativeLabel}
          color={color}
          variant={variant}
          size={size}
          {...props}
          className={mergeClasses(
            stepperClasses.root,
            orientation === 'horizontal'
              ? stepperClasses.horizontal
              : stepperClasses.vertical,
            alternativeLabel && stepperClasses.alternativeLabel,
            className,
          )}
        >
          {items.map((child, index) =>
            cloneElement(child as ReactElement<{ index?: number }>, {
              index,
              key: child.key ?? index,
            }),
          )}
        </SStepper>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';

export type {
  TStepperProps,
  TStepperOrientation,
  TStepperSize,
  TStepperVariant,
  TStepStatus,
} from './types';
export { stepperClasses } from './classes';
export { StepperContext, StepContext } from './context';
export { Stepper };
export default Stepper;
