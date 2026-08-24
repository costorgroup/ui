import { createContext } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TStepperOrientation = 'horizontal' | 'vertical';
export type TStepperSize = 'sm' | 'md' | 'lg';
export type TStepperVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'plain';
export type TStepStatus = 'complete' | 'active' | 'incomplete';

export type TStepperContextValue = {
  activeStep: number;
  orientation: TStepperOrientation;
  alternativeLabel: boolean;
  color: TPaletteColor;
  variant: TStepperVariant;
  size: TStepperSize;
  setActiveStep?: (index: number) => void;
};

export type TStepContextValue = {
  index: number;
  status: TStepStatus;
  optional: boolean;
  error: boolean;
  disabled: boolean;
};

export const StepperContext = createContext<TStepperContextValue | null>(null);
export const StepContext = createContext<TStepContextValue | null>(null);
