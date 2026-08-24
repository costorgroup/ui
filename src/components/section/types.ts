import { HTMLAttributes, ReactNode } from 'react';

export type TSectionProps = Omit<HTMLAttributes<HTMLElement>, 'color' | 'title'> & {
  children?: ReactNode;
  title?: ReactNode;
};
