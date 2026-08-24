import { HTMLAttributes, ReactNode } from 'react';
import { TStepContextValue } from '../context';

export type TStepStatusRender =
  | ReactNode
  | ((ctx: TStepContextValue) => ReactNode);

export type TStepStatusProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  complete?: TStepStatusRender;
  incomplete?: TStepStatusRender;
  active?: TStepStatusRender;
};
