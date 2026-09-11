import { HTMLAttributes, ReactNode } from 'react';

export type TEmptyContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
