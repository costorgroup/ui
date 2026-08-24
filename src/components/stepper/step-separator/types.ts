import { HTMLAttributes } from 'react';
import { TStepStatus } from '../context';

export type TStepSeparatorProps = HTMLAttributes<HTMLDivElement>;

export type TSStepSeparatorProps = {
  orientation: 'horizontal' | 'vertical';
  status: TStepStatus;
};
