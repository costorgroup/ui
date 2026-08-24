import { HTMLAttributes, ReactNode } from 'react';
import { TStepperVariant, TStepStatus } from '../context';

export type TStepIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type TSStepIndicatorProps = {
  status: TStepStatus;
  variant: TStepperVariant;
  error: boolean;
};
