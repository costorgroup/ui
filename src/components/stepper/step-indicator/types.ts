import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TStepperVariant, TStepStatus } from '../context';

export type TStepIndicatorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
};

export type TSStepIndicatorProps = {
  status: TStepStatus;
  variant: TStepperVariant;
  color: TPaletteColor;
  error: boolean;
};
