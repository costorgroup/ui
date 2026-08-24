import { HTMLAttributes, ReactNode } from 'react';

export type TStepContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
