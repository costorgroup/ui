import { HTMLAttributes, ReactNode } from 'react';
import { TStepStatus } from '../context';

export type TStepProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  'color' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  index?: number;
  completed?: boolean;
  optional?: boolean;
  error?: boolean;
  disabled?: boolean;
};

export type TSStepProps = {
  orientation: 'horizontal' | 'vertical';
  alternativeLabel: boolean;
  status: TStepStatus;
  error: boolean;
  disabled: boolean;
};
