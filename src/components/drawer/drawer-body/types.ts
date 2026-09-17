import { HTMLAttributes, ReactNode } from 'react';

export type TDrawerBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  scrollable?: boolean;
};
