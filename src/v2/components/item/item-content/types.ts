import { HTMLAttributes, ReactNode } from 'react';

export type TItemContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
