import { HTMLAttributes, ReactNode } from 'react';

export type TMenuBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  top: number;
  left: number;
  visible: boolean;
};

export type TSMenuBaseProps = {
  top: number;
  left: number;
  visible: boolean;
};
