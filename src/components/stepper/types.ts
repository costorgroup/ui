import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import {
  TStepperOrientation,
  TStepperSize,
  TStepperVariant,
} from './context';

export type {
  TStepperOrientation,
  TStepperSize,
  TStepperVariant,
  TStepStatus,
} from './context';

export type TStepperProps = Omit<
  HTMLAttributes<HTMLOListElement>,
  'color' | 'onChange'
> & {
  children?: ReactNode;
  activeStep?: number;
  defaultActiveStep?: number;
  onChange?: (step: number) => void;
  orientation?: TStepperOrientation;
  alternativeLabel?: boolean;
  color?: TPaletteColor;
  variant?: TStepperVariant;
  size?: TStepperSize;
};

export type TSStepperProps = {
  orientation: TStepperOrientation;
  alternativeLabel: boolean;
  color: TPaletteColor;
  variant: TStepperVariant;
  size: TStepperSize;
};
