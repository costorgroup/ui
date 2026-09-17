import { HTMLAttributes, ReactNode } from 'react';

export type TWindowContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
